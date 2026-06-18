const fs = require('fs');
const path = require('path');

// 解析基坑工程手册
function parsePitHandbook() {
  const filePath = path.join(__dirname, '../../基坑工程手册第二版技术内容整理.md');
  const content = fs.readFileSync(filePath, 'utf8');
  
  const formulas = [];
  const methods = [];
  const parameters = [];
  
  // 提取公式
  const formulaRegex = /```[\s\S]*?```/g;
  const formulaMatches = content.match(formulaRegex) || [];
  
  formulaMatches.forEach((match, index) => {
    const formulaText = match.replace(/```/g, '').trim();
    if (formulaText && formulaText.includes('=')) {
      // 查找公式名称（在代码块之前的内容）
      const beforeFormula = content.substring(0, content.indexOf(match));
      const lines = beforeFormula.split('\n');
      let formulaName = '';
      for (let i = lines.length - 1; i >= 0; i--) {
        if (lines[i].includes('**') || lines[i].includes('####')) {
          formulaName = lines[i].replace(/\*\*/g, '').replace(/####/g, '').trim();
          break;
        }
      }
      
      if (formulaName) {
        formulas.push({
          id: `pit-formula-${index + 1}`,
          name: formulaName,
          formula: formulaText.split('\n')[0], // 取第一行作为公式
          description: formulaName,
          params: [],
          category: '土压力',
          keywords: formulaName.split(/[、，,]/),
          source: '基坑工程手册'
        });
      }
    }
  });
  
  // 提取参数
  const paramRegex = /[：:]\s*([^\s,，]+)/g;
  const paramMatches = content.match(paramRegex) || [];
  
  const uniqueParams = new Set();
  paramMatches.forEach(match => {
    const param = match.replace(/[：:]\s*/, '').trim();
    if (param.length > 1 && param.length < 10 && !uniqueParams.has(param)) {
      uniqueParams.add(param);
      parameters.push({
        id: `param-${parameters.length + 1}`,
        name: param,
        symbol: '',
        value: '',
        unit: '',
        description: param,
        keywords: [param],
        source: '基坑工程手册'
      });
    }
  });
  
  return { formulas, methods, parameters };
}

// 解析深基坑工程设计施工手册
function parseDeepPitHandbook() {
  const filePath = path.join(__dirname, '../../深基坑工程设计施工手册技术内容整理.md');
  const content = fs.readFileSync(filePath, 'utf8');
  
  const formulas = [];
  const methods = [];
  const parameters = [];
  
  // 提取公式
  const formulaRegex = /```[\s\S]*?```/g;
  const formulaMatches = content.match(formulaRegex) || [];
  
  formulaMatches.forEach((match, index) => {
    const formulaText = match.replace(/```/g, '').trim();
    if (formulaText && formulaText.includes('=')) {
      formulas.push({
        id: `deep-pit-formula-${index + 1}`,
        name: `深基坑公式${index + 1}`,
        formula: formulaText.split('\n')[0],
        description: '深基坑工程设计施工手册公式',
        params: [],
        category: '深基坑',
        keywords: ['深基坑', '公式'],
        source: '深基坑工程设计施工手册'
      });
    }
  });
  
  return { formulas, methods, parameters };
}

// 生成数据文件
function generateDataFiles() {
  const pitData = parsePitHandbook();
  const deepPitData = parseDeepPitHandbook();
  
  // 读取现有的公式数据
  const existingPitFormulas = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/pit/formulas.json'), 'utf8'));
  const existingDeepPitFormulas = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/deep-pit/formulas.json'), 'utf8'));
  
  // 合并数据
  const mergedPitFormulas = [...existingPitFormulas, ...pitData.formulas];
  const mergedDeepPitFormulas = [...existingDeepPitFormulas, ...deepPitData.formulas];
  
  // 写入文件
  fs.writeFileSync(
    path.join(__dirname, '../data/pit/formulas.json'),
    JSON.stringify(mergedPitFormulas, null, 2)
  );
  
  fs.writeFileSync(
    path.join(__dirname, '../data/deep-pit/formulas.json'),
    JSON.stringify(mergedDeepPitFormulas, null, 2)
  );
  
  console.log('数据文件生成完成');
  console.log('基坑工程公式:', mergedPitFormulas.length);
  console.log('深基坑公式:', mergedDeepPitFormulas.length);
}

// 运行
generateDataFiles();

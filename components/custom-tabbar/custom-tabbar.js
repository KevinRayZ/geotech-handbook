Component({
  data: {
    selected: 0,
    color: "#666666",
    selectedColor: "#0052D9",
    list: [
      {
        pagePath: "/pages/index/index",
        text: "首页",
        iconPath: "home",
        selectedIconPath: "home-filled"
      },
      {
        pagePath: "/pages/knowledge/knowledge",
        text: "知识库",
        iconPath: "book",
        selectedIconPath: "book-filled"
      },
      {
        pagePath: "/pages/advisor/advisor",
        text: "方案助手",
        iconPath: "tips",
        selectedIconPath: "tips-filled"
      },
      {
        pagePath: "/pages/profile/profile",
        text: "我的",
        iconPath: "user",
        selectedIconPath: "user-filled"
      }
    ]
  },

  methods: {
    switchTab(e) {
      const index = e.currentTarget.dataset.index;
      const item = this.data.list[index];
      wx.switchTab({
        url: item.pagePath
      });
    }
  }
});

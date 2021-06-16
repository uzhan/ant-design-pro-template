module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'bug', // 此项特别针对bug号，用于向测试反馈bug列表的bug修改情况，bug: #禅道bug编号 (正确填写bug相关描述)。 例如：bug: #2021 (登录页面点击登录未发送请求)
        'feature', // 新功能（feature）。例如：feature: 商户数据列表增加导出Excel功能
        'fix', // 修补bug。 例如：fix: 修复登录退出未请求服务端接口
        'docs', // 文档（documentation）。例如：docs: 商户操作说明文档完善补充协议
        'style', // 样式修改。例如：style: 登录页面背景颜色调整至灰白色
        'refactor', // 重构（即不是新增功能，也不是修改bug的代码变动）。例如：refactor: 重构商家数据列表，优化性能提升
        'test', // 增加测试。 例如：test: 登录页面测试环境调试
        'chore', // 构建过程或辅助工具的变动。例如：chore: tsconfig.json相关配置完善
        'revert', // feat(pencil): add ‘graphiteWidth’ option (撤销之前的commit)。例如：revert: 撤销误提交代码commit
        'merge', // 合并分支， 例如： merge（前端页面）： feature-xxxx修改线程地址。例如：merge: 合并优化需求v2.2测试代码至预发布环境
      ],
    ],
  },
};

export class WSResponse<T = any> {
    /**
     * @param path 消息发布路径（对应 MessagePath 枚举）
     * @param message 消息标题/简要说明
     * @param data 消息主体内容
     */
    constructor(
      public readonly path: string,
      public readonly message: string,
      public readonly data: T
    ) {}
  
    // 可能包含的其他方法或属性：
    // 1. 时间戳属性（如 createTime）
    // 2. 状态码属性（如 statusCode）
    // 3. 序列化方法
    // 4. 错误处理相关属性
  }
/**
 * 缓存工具类：用于存储需要上报的数据进而实现批量上报
 */

export interface ICachePool {
  getCache(): Map<string, any[]> // 获取缓存map
}

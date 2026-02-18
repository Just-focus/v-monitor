/**
 * 缓存工具类：用于存储需要上报的数据进而实现批量上报
 */

export interface ICachePool {
  getCache(): Map<string, any[]> // 获取缓存map
  addCache(key: string, data: any): void // 添加数据到缓存
  takeCache(key: string): any[] // 获取指定类型数据并清空缓存
  addBatchCache(key: string, data: any[]): void // 批量添加数据到缓存
  getSize(key: string): number // 获取指定key的缓存大小
  getAllCacheData(): any[] // 获取所有缓存数据
  clearCacheByKey(key: string): void // 清空指定类型的缓存
  clearCache(): void // 清空所有缓存
}

class CachePool implements ICachePool {
  private cacheMap: Map<string, any[]>

  constructor() {
    this.cacheMap = new Map()
  }

  getCache(): Map<string, any[]> {
    return this.cacheMap
  }

  addCache(key: string, data: any): void {
    const existingData = this.cacheMap.get(key) || []
    existingData.push(data)
    this.cacheMap.set(key, existingData)
  }

  takeCache(key: string): any[] {
    const data = this.cacheMap.get(key) || []
    this.cacheMap.delete(key)
    return data
  }

  addBatchCache(key: string, data: any[]): void {
    const existingData = this.cacheMap.get(key) || []
    const newData = existingData.concat(data)
    this.cacheMap.set(key, newData)
  }

  getSize(key: string): number {
    const data = this.cacheMap.get(key)
    return data ? data.length : 0
  }

  getAllCacheData(): any[] {
    const allData: any[] = []
    this.cacheMap.forEach((data) => {
      allData.push(...data)
    })
    return allData
  }

  clearCacheByKey(key: string): void {
    this.cacheMap.delete(key)
  }

  clearCache(): void {
    this.cacheMap.clear()
  }
}

export const cachePool = new CachePool()

/**
 * Created by Fakin on 2018/10/19.
 */
import  axios from 'axios';
//获取排名详情
export function rank(id) {
  return axios.get(`/api/ranking/${id}`)
}
//获取排行分类
export function rankCategory() {
  return axios.get(`/api/ranking/gender`)
}
//获取分类（带书籍数量）
export function categories() {
  return axios.get(`/api/cats/lv2/statistics`)
}
//获取分类（带子类）
export function subCategories() {
  return axios.get(`/api/cats/lv2`)
}
//获取分类详情
export function categoriesInfo(gender, type, major, minor, start, limit) {
  return axios.get(`/api/book/by-categories?gender=${gender}&type=${type}&major=${major}&minor=${minor}&start=${start}&limit=${limit}`)
}
//获取书单
export function bookLists(type, dur, start, gender) {
  return axios.get(`/api/book-list?sort=${type}&duration=${dur}&start=${start}${gender}`)
}
//获取书单信息
export function bookListsInfo(id) {
  return axios.get(`/api/book-list/${id}`)
}
//获取书籍信息
export function book(id) {
  return axios.get(`/api/book/${id}`)
}

//获取书籍评论
export function bookComments(id) {
  return axios.get(`/api/post/review/best-by-book?book=${id}&limit=10`)
}

//获取书籍源
export function bookSources(id) {
  return axios.get(`/api/atoc/?view=summary&book=${id}`)
}

//获取书籍章节(根据书籍源获取章节)
export function BookChapters(id) {
  return axios.get(`/api/btoc/${id}?view=chapters&channel=mweb`)
}

//获取章节内容(根据章节获取内容)
export function chapterContent(link) {
    return axios.get(`/content/chapter/${link}`)
}
//搜索
export function search(keyword) {
  return axios.get(`/api/book/fuzzy-search?query=${keyword}`)
}

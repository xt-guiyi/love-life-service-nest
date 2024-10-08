/*
 * @Author: xt-guiyi 1661219752@qq.com
 * @Date: 2024-07-02 21:38:57
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2024-09-16 17:06:15
 * @Description:
 */
import * as Mock from 'mockjs'

const commentList = Mock.mock({
	'data|100': [
		{
			'id|+1': 1,
			username: '@cname(5,8)',
			pubDate: 1721498978810, // 发布时间
			ipAddress: '广东',
			content: '@cword(8,300)',
			avatar: 'https://images.cubox.pro/1721051614822/384150/image.png',
			like: '@integer(1000, 10000)', // 点赞数
		},
	],
})

function getPaginatedComments(page, pageSize) {
	const total = commentList.data.length
	const start = (page - 1) * pageSize
	const end = page * pageSize
	const data = commentList.data.slice(start, end)

	return {
		page,
		pageSize,
		total,
		data,
	}
}

export { getPaginatedComments }

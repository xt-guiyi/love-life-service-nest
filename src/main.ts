/*
 * @Author: xt-guiyi 1661219752@qq.com
 * @Date: 2024-07-02 21:04:24
 * @LastEditors: xt-guiyi 1661219752@qq.com
 * @LastEditTime: 2024-10-31 23:43:52
 * @Description:
 */
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { formatInterceptor } from './common/FormatInterceptor'
import { getLocalIpAddress } from './utils/networkUtils'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	// swagger
	const config = new DocumentBuilder()
		.setTitle('love-life-service-nest')
		.setDescription('后端服务(nest版)')
		.setVersion('1.0')
		.addBearerAuth()
		.build()
	const document = SwaggerModule.createDocument(app, config)
 SwaggerModule.setup('swagger', app, document, {
		customSiteTitle: '趣玩api文档',
    // 设置为js文件，和css文件为cdn，防止vercel无法加载
		customJs: [
			'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
			'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
		],
		customCssUrl: [
			'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
			'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css',
			'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css',
		],
 })
	// 设置拦截器
	// app.useGlobalInterceptors(new formatInterceptor())
  // 允许跨域
	app.enableCors({
		origin: '*', // 允许的源，使用 '*' 可以允许所有源
		methods: 'GET,POST,PUT,DELETE', // 允许的 HTTP 请求方法
		allowedHeaders: 'Content-Type, Authorization', // 允许的请求头
		credentials: true, // 是否允许发送 cookie
	})
	// 启动服务
	await app.listen(process.env.PORT || 3000, () => {
		// 获取本机ip地址
		app.getUrl().then(url => {
			console.log(`Server is running on ${url}`)
			console.log(`Server is running on http://127.0.0.1:3000`)
			console.log(`Server is running on http://${getLocalIpAddress()}:3000`)
			console.log(`Swagger Document is running on http://127.0.0.1:3000/swagger`)
		})
	})
}
bootstrap()

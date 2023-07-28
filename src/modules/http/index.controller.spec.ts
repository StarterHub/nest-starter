import { Test, TestingModule } from '@nestjs/testing'
import { HttpController } from './index.controller'
import { HttpService } from './index.service'

describe('TestController', () => {
  let app: TestingModule

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [HttpController],
      providers: [HttpService],
    }).compile()
  })

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      const appController = app.get(HttpController)
      expect(appController.getHello()).toBe('Hello World!')
    })
  })
})

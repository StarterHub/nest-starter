import { Test, TestingModule } from '@nestjs/testing'
import { TestController } from './index.controller'
import { TestService } from './index.service'

describe('TestController', () => {
  let app: TestingModule

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [TestController],
      providers: [TestService],
    }).compile()
  })

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      const appController = app.get(TestController)
      expect(appController.getHello()).toBe('Hello World!')
    })
  })
})

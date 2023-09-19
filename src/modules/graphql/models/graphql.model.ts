import { Directive, Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType({ description: 'recipe' })
export class Recipe {
  @Field((type) => ID)
  id: string

  @Directive('@upper')
  @Field({ nullable: true })
  title: string

  @Field({ nullable: true })
  description?: string

  @Field()
  creationDate: Date

  @Field((type) => [String])
  ingredients: string[]
}

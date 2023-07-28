import { NotFoundException } from '@nestjs/common'
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql'
import { PubSub } from 'graphql-subscriptions'
import { NewRecipeInput } from './dto/new-recipe.input'
import { RecipesArgs } from './dto/recipes.args'
import { Recipe } from './models/index.model'
import { GraphQLService } from './index.service'

const pubSub = new PubSub()

@Resolver((of) => Recipe)
export class GraphQLResolver {
  constructor(private readonly recipesService: GraphQLService) {}

  @Query((returns) => Recipe)
  async recipe(@Args('id') id: string): Promise<Recipe> {
    const recipe = await this.recipesService.findOneById(id)
    if (!recipe) {
      throw new NotFoundException(id)
    }
    return recipe
  }

  @Query((returns) => [Recipe])
  recipes(@Args() recipesArgs: RecipesArgs): Promise<Recipe[]> {
    return this.recipesService.findAll(recipesArgs)
  }

  @Mutation((returns) => Recipe)
  async addRecipe(
    @Args('newRecipeData') newRecipeData: NewRecipeInput,
  ): Promise<Recipe> {
    const recipe = await this.recipesService.create(newRecipeData)
    pubSub.publish('recipeAdded', { recipeAdded: recipe })
    return recipe
  }

  @Mutation((returns) => Boolean)
  async removeRecipe(@Args('id') id: string) {
    return this.recipesService.remove(id)
  }

  @Subscription((returns) => Recipe)
  recipeAdded() {
    return pubSub.asyncIterator('recipeAdded')
  }
}
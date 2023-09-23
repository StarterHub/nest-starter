import { NotFoundException, UseFilters, UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql'
import { PubSub } from 'graphql-subscriptions'
import { I18nContext, I18nService } from 'nestjs-i18n'
import { NewRecipeInput } from './dto/new-recipe.input'
import { RecipesArgs } from './dto/recipes.args'
import { Recipe } from './models/graphql.model'
import { GraphQLService } from './graphql.service'
import { GqlAuthGuard } from './graphql.guard'
import { GraphQLExceptionFilter } from '../../common/filters/gql-exception.filter'

const pubSub = new PubSub()

@Resolver((of) => Recipe)
@UseFilters(new GraphQLExceptionFilter())
export class GraphQLResolver {
  constructor(
    private readonly recipesService: GraphQLService,
    private readonly i18n: I18nService,
  ) {}

  @Query((returns) => String)
  async hello(): Promise<string> {
    return this.i18n.t('common.HELLO', { lang: I18nContext.current().lang })
  }

  @Query((returns) => String)
  async hello2(): Promise<string> {
    return this.i18n.t('common.NEW', {
      args: { name: 'Kimmy' },
      lang: I18nContext.current().lang,
    })
  }

  @Query((returns) => Recipe)
  @UseGuards(GqlAuthGuard)
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
    await pubSub.publish('recipeAdded', { recipeAdded: recipe })
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

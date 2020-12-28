import Head from 'next/head';
import Link from 'next/link';
import Clock from '../../components/Clock';
import { recipeQuery } from '../../queries/RecipeQuery';
import { recipesQuery } from '../../queries/RecipesQuery';

export async function getStaticProps({ params }) {
  const { recipe } = await recipeQuery(params.slug);

  return {
    props: {
      recipe,
    },
  };
}

export async function getStaticPaths() {
  const { recipes } = await recipesQuery();

  return {
    paths: recipes.map(({ slug }) => ({
      params: { slug },
    })),
    fallback: false,
  };
}

const Recipe = ({ recipe }) => {
  return (
    <div className="container">
      <Head>
        <title>{recipe.title}</title>
      </Head>
      <Link href="/">
        <h4>&laquo; Back to Home</h4>
      </Link>
      <h1>{recipe.title}</h1>
      <div className="description-container">
        <div>
          <p>{recipe.description}</p>
          <div className="duration-container">
            <Clock /> {recipe.cookingDuration}
          </div>
        </div>
        <div>
          <img src={recipe.mainImage.url} alt={recipe.title} />
        </div>
      </div>
      <div className="steps-container">
        <h2>Directions</h2>
        {recipe.recipeSteps.map((step, index) => (
          <div className="recipe-step" key={`step-${index}`}>
            <div className="step-number">{index + 1}.</div>
            <div className="step-description">{step.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recipe;

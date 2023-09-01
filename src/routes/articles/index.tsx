import {
  Card,
  CardCta,
  CardDescription,
  CardEyebrow,
  CardTitle,
} from "@/components/Card";
import { SimpleLayout } from "@/components/SimpleLayout";
import { formatDate } from "@/lib/formatDate";
import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";

const Article = component$<{
  description: string;
  title: string;
  date: string;
  slug: string;
}>(({ date, description, slug, title }) => {
  return (
    <article class="md:grid md:grid-cols-4 md:items-baseline">
      <Card class="md:col-span-3">
        <CardTitle href={`/articles/${slug}`}>{title}</CardTitle>
        <CardEyebrow as="time" dateTime={date} class="md:hidden" decorate>
          {formatDate(date)}
        </CardEyebrow>
        <CardDescription>{description}</CardDescription>
        <CardCta>Read article</CardCta>
      </Card>
      <CardEyebrow as="time" dateTime={date} class="mt-1 hidden md:block">
        {formatDate(date)}
      </CardEyebrow>
    </article>
  );
});

export const metadata = {
  title: "Articles",
  description:
    "All of my long-form thoughts on programming, leadership, product design, and more, collected in chronological order.",
};

export const useArticleServer = routeLoader$(async () => {
  const datum: {
    description: string;
    title: string;
    date: string;
    slug: string;
  }[] = /* await getAllArticles() */ [];
  return datum;
});

export default component$(() => {
  const articles = useArticleServer();

  return (
    <SimpleLayout
      title="Writing on software design, company building, and the aerospace industry."
      intro="All of my long-form thoughts on programming, leadership, product design, and more, collected in chronological order."
    >
      <div class="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div class="flex max-w-3xl flex-col space-y-16">
          {articles.value.map((article) => (
            <Article key={article.slug} {...article} />
          ))}
        </div>
      </div>
    </SimpleLayout>
  );
});

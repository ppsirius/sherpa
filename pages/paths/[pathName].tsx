import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import { ParsedUrlQuery } from 'querystring'
import {
  paths,
  Path,
  hasPrevPaths,
  hasNextPaths,
  hasExtras,
  deserializePath,
  SerializedPaths,
} from '../../data'
import {
  Header,
  Hero,
  Villain,
  Container,
  Box,
  Typography,
  Grid,
  Masonry,
  Underline,
} from '../../src/theme'
import { List as PathsList } from '../../src/paths'
import {
  Timeline as ResourcesTimeline,
  List as ResourcesList,
} from '../../src/resources'

interface Params extends ParsedUrlQuery {
  pathName: string
}

interface StaticProps {
  paths: SerializedPaths
  path: Path
}

export const getStaticPaths: GetStaticPaths = async () => {
  const staticPaths = Object.keys(paths).map((pathName) => ({
    params: { pathName },
  }))

  return { paths: staticPaths, fallback: false }
}

export const getStaticProps: GetStaticProps<StaticProps, Params> = async ({
  params,
}) => {
  const serializedPath = paths[params!.pathName]
  const path = deserializePath(serializedPath)

  return {
    props: {
      paths,
      path,
    },
  }
}

type Props = InferGetStaticPropsType<typeof getStaticProps>

const pathResourcesTestId = 'path.resources'
const pathExtrasTestId = 'path.extras'

export default function PathPage({ path, paths }: Props) {
  return (
    <Box>
      <Head>
        <title>Sherpa: the {path.title} path</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png?v=1"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png?v=1"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png?v=1"
        />
        <link rel="manifest" href="/site.webmanifest?v=1" />
        <link
          rel="mask-icon"
          href="/safari-pinned-tab.svg?v=1"
          color="#5bbad5"
        />
        <link rel="shortcut icon" href="/favicon.ico?v=1" />
        <meta name="msapplication-TileColor" content="#ff6bdf" />
        <meta name="theme-color" content="#ffffff" />
      </Head>

      <Header />

      <main>
        <Hero>
          <Typography variant="h1" color="primary.contrastText">
            The <Underline>{path.title}</Underline> path
          </Typography>
        </Hero>

        {hasPrevPaths(path) && (
          <Box pb={4}>
            <Container>
              <aside>
                <Typography variant="h3" component="h2" gutterBottom>
                  You want to come from
                </Typography>
                <PathsList paths={path.prev} />
              </aside>
            </Container>
          </Box>
        )}

        <Box pb={4}>
          <Container data-testid={pathResourcesTestId}>
            <Grid container>
              <Grid item xs={12} md={8} xl={6}>
                <ResourcesTimeline resources={path.resources} />
              </Grid>
            </Grid>
          </Container>
        </Box>

        {hasExtras(path) && (
          <Box py={4}>
            <Container>
              <Masonry columns={{ xs: 1, md: 2, lg: 3 }} spacing={4}>
                {path.extras.map((extra, index) => (
                  <Box data-testid={pathExtrasTestId} key={index}>
                    <aside>
                      <Typography component="h2" variant="h5" gutterBottom>
                        {extra.title}
                      </Typography>
                      <ResourcesList resources={extra.resources} />
                    </aside>
                  </Box>
                ))}
              </Masonry>
            </Container>
          </Box>
        )}

        <Villain>
          {hasNextPaths(path) && (
            <Box py={4}>
              <aside>
                <Typography variant="h3" component="h2" gutterBottom>
                  You could continue with
                </Typography>
                <PathsList paths={path.next} />
              </aside>
            </Box>
          )}
        </Villain>
      </main>
    </Box>
  )
}
// after={}

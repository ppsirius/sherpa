import React from 'react'
import NextLink from 'next/link'
import { SerializedPaths } from '../../data'
import { List, Link, Typography, Box } from '../theme'
import { Underline } from '../theme'

type Props = {
  paths: SerializedPaths
}

const pathsListTestId = 'paths.list'
const pathsListItemTestId = 'paths.list.item'
const pathsListItemLinkTestId = 'paths.list.item.link'

const PathsList = ({ paths }: Props) => (
  <Box data-testid={pathsListTestId}>
    <List>
      {Object.entries(paths).map(([pathName, path]) => (
        <Box key={pathName} data-testid={pathsListItemTestId} component="span">
          <NextLink href={`/paths/${pathName}`} passHref>
            <Link data-testid={pathsListItemLinkTestId}>
              <Typography variant="h6">
                The <Underline>{path.title}</Underline> path
              </Typography>
            </Link>
          </NextLink>
        </Box>
      ))}
    </List>
  </Box>
)

export default PathsList

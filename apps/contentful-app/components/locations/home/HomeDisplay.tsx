import React from 'react'
import { Paragraph, Heading, Box, Grid } from '@contentful/f36-components'
import styles from './HomeDisplay.module.scss'

const HomeDisplay = () => {
  const columns = [
    {
      title: 'www.countries.com',
      links: ['Confluence', 'Docs', 'Design', 'API Reference', 'Guidelines']
    },
    {
      title: 'www.cars.com',
      links: ['Docs', 'Editor Team', 'Design System', 'Components', 'Best Practices']
    },
    {
      title: 'Updates',
      links: ['Changelog', 'Roadmap', 'Announcements', 'Latest News', 'Releases']
    }
  ]

  return (
    <Box padding='spacingL'>
      <Heading as='h1' marginTop='spacingM' marginBottom='spacingL' className={styles.pageTitle}>
        Contentful Homepage
      </Heading>

      <Grid columns={3} columnGap='spacingL' rowGap='spacingL' className={styles.linksGrid}>
        {columns.map((column) => (
          <Box key={column.title} padding='spacingM' border='neutral' borderRadius='medium'>
            <Heading as='h2' marginBottom='spacingM' fontSize='fontSizeXl'>
              {column.title}
            </Heading>

            <Box as='ul' className={styles.linksList}>
              {column.links.map((link) => (
                <Box as='li' key={link} marginBottom='spacingS'>
                  <Paragraph fontSize='fontSizeXl'>
                    <a href='#' className={styles.link}>
                      {link}
                    </a>
                  </Paragraph>
                </Box>
              ))}
            </Box>
          </Box>
        ))}
      </Grid>
    </Box>
  )
}

export default HomeDisplay

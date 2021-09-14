import React from 'react'
import portfolioStyles from "../../styles/Portfolio.module.scss"
import SocialIcons from "../../components/SocialIcons"
import ProjectList from "../../components/ProjectList"
import Layout from "../../components/Layout"
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import project from './[slug]'
import {sortById} from "../../utils/sortById"

const portfolio = ({ projects }) => {
  return (
    <Layout>
      <div className={portfolioStyles.portfolio}>
        <section className={portfolioStyles.header}>
          <h1>Projects 📚</h1>
          <p>A curated collection of projects that i&apos;m personally proud of, or helped shape me as a developer.</p>
          <SocialIcons/>
        </section>
        <ProjectList projects={projects}/>
      </div>
    </Layout>
  )
}

export const getStaticProps = async (context) => {

  const files = fs.readdirSync(path.join('_content'))

  // Get slug and frontmatter from files
  const projects = files.map(filename => {
    // create slug
    const slug = filename.replace('.md', '')
 
    // gives unparsed markdown, exactly whats in the files
    const markdownWithMeta = fs.readFileSync(
      path.join('_content', filename),
      'utf-8'
    )

    // Gets metadata from markdown files, renaming data to frontmatter
    const {data: frontmatter} = matter(markdownWithMeta)

    return {
      slug,
      frontmatter
    }
  })


  return {
    props: {
      projects: projects.sort(sortById)
    }
  }
}

export default portfolio

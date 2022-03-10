import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';
import Tags from '../components/tags';
import PostList from '../components/post-list';
import StyledLink from '../components/styled-link';
import styled from 'styled-components';

const TagsTemplate = ({ pageContext, data }) => {
  const { tag } = pageContext;
  const { totalCount } = data.allMarkdownRemark;
  const posts = data.allMarkdownRemark.nodes;
  const title = `${tag} - najważniejsze informacje`;
  
  const tags = data.allMarkdownRemark.group.map(tag => {
    return tag.fieldValue
  });
 
  return (
    <Layout title={title}>
      <TagsTemplateWrapper>
        <Title>
          {tag} - najważniejsze informacje
        </Title>
        <Tags tags={tags}/>
        <PostList posts={posts} />

        <StyledLink
          css={`
            margin-top: var(--size-400);
            display: inline-block;
          `}
          to="/tags"
        >
          Wszystkie tematy
        </StyledLink>
      </TagsTemplateWrapper>
    </Layout>
  );
};

export default TagsTemplate;

const TagsTemplateWrapper = styled.div`
  padding-top: var(--size-900);
`;

const Title = styled.h1`
  font-size: var(--size-700);
`;

export const pageQuery = graphql`
  query($tag: String) {
    
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: { tags: { in: [$tag] } }
        fields: { contentType: { eq: "posts" } }
      }
    ) {
      totalCount
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }

      nodes {
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          description
          tags
          title
        }
        timeToRead
        excerpt
      }
    }
  }
`;

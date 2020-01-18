import React from "react"
import styled, { keyframes } from "styled-components"
import { Link } from "gatsby"
import Parser from "html-react-parser"

import DescriptionIcon from "@material-ui/icons/Description"

import * as theme from "../theme"

export default props => {
  const { title, content, url, image, author, noPlaceholder, ...rest } = props
  console.log({ props })
  return (
    <Card {...rest} to={url}>
      {image ? (
        <FeaturedImage
          alt={image.alt}
          src={image.sourceUrl}
          srcSet={image.srcSet}
          sizes={image.sizes}
        />
      ) : (
        !noPlaceholder && (
          <PlaceholderImage>
            <DescriptionIcon />
          </PlaceholderImage>
        )
      )}
      <Content>
        {title && <h3>{title}</h3>}

        {content && Parser(content)}

        {author && (
          <Author>
            {author?.avatar?.url && <Avatar src={author.avatar.url} />}
            {author?.slug && <Username>{author.slug}</Username>}
          </Author>
        )}
      </Content>
    </Card>
  )
}

const fadeIn = keyframes`
from {
  transform: translateY(5%);
  opacity: 0;
}

to {
  transform: translateY(0);
  opacity: 1;
}
`

const Card = styled.div`
  animation: ${fadeIn} 0.25s ease-in-out;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  background-color: ${theme.colors.lightBackground};
  transition: background-color 0.15s ease-in-out;
`

const FeaturedImage = styled.img`
  object-fit: cover;
  border-radius: 5px 5px 0px 0px;
  height: 240px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.05);
`
const PlaceholderImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px 5px 0px 0px;
  height: 240px;
  width: 100%;
  background: rgba(42, 151, 166, 0.8);
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 15px;
`

const Author = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`
const Avatar = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 100%;
`

const Username = styled.span`
  margin-left: 15px;
`

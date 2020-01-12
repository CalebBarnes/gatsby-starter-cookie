import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import Parser from "html-react-parser"

import DescriptionIcon from "@material-ui/icons/Description"

export default props => {
  const { title, content, url, image, author, ...rest } = props
  console.log(props)
  return (
    <Card {...rest} to={url}>
      {image ? (
        <FeaturedImage src={image} />
      ) : (
        <PlaceholderImage>
          <DescriptionIcon />
        </PlaceholderImage>
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

const Card = styled.div`
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.05);
`

const FeaturedImage = styled.img`
  border-radius: 5px 5px 0px 0px;
  height: 240px;
  width: 100%;
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
  padding: 10px;
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
  margin-bottom: 0px;
`

const Username = styled.span`
  margin-left: 15px;
`

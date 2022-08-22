import { request, gql, GraphQLClient } from 'graphql-request';

const endpoint = 'https://api-eu-west-2.hygraph.com/v2/cl6uohujb2iug01uq17sib6hy/master';

const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    authorization: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2NjA1Nzg5MzIsImF1ZCI6WyJodHRwczovL2FwaS1ldS13ZXN0LTIuaHlncmFwaC5jb20vdjIvY2w2dW9odWpiMml1ZzAxdXExN3NpYjZoeS9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiOGFjMTBiYzMtMTE1NC00OTk2LWIzOTYtYWU4ZmIzMzdjOWFkIiwianRpIjoiY2w2dXh0a21sMnRzcjAxdXEwZ3ZlZXd4bSJ9.N5l0uz3JQrT70CY1hwI9zFNSdcqG4prJ7XXSotOU8WjcwgDhZi_pVI3bQf8zfhdwwTq9B8O-E3TdzQY6dnDLtgPQCnJbl2z6jhAirxvXguRQtThcmnpwZtdy1zxWujAvMqN8Zg9o0xq7INFWIljUJU9yNtFdq12peLcgQdNJ23xzde5ZQ1vRAnGXF-5VIYe4BURC6vU6FdcKgYG8ed8WB3yrMVvc-CelpeJqLKrOCvDV0DsdfQ5egB1jcpUpGapPgzUrrfq-F2DWFHmb0x_2c5bW8oa6oAA-t1mLLYIW1pSmhkPEHY-mQtNTTbQKHmIyx1sbJop67JLSWW8fJ3GYnGYqOxnJgywk88TcqtYj1d3LQpMCSpPo8F_KMYpO5qHmKru0kB--LIasGeuaqVtETYdLuWMBmg30Nw_MdMOE6pBr1LGhgSJ7HGzTUw_ggeR9pnI6W8lZD_LmPLLqaD78jpIHw5yIIGgvOMunaR1ZMf1SixFLGNsU3tgMndz9CylvUXy-4-itVQhxHuNSKO7nw7v9XwGyiqHfsJp0vVih0wsEJMOfx1ms0jpJuwV3Q-DyZtaPeFnHMYhBwcOONjfIWlRSFvNZub4_415ooHxesJ6w0qMdRIe9EDN6nymeTAcWZSyeApmwdtwfd-SxBb8o9FnOZWuTkXLJJ6wqCd_DRMM'
  }
})

export async function getArtistUrls(onSuccess){

  const query = gql`
  query MyQuery {
    artists {
      slug
      artistImage {
        url
        id
      }
    }
  }`

  const data = await graphQLClient.request(query);
  onSuccess(data.artists.map(artist => artist.artistImage.url), data.artists.map(artist => artist.slug)) //extract these into functions
}

export async function getBio(onSuccess, slugObj){
  const query = gql`
  query MyQuery($slug: String!) {
    artists(where: {slug: $slug}) {
      bio {
        id
        name
        bioImage {
          id
          url
        }
        artistDescription
        credits {
          html
        }
        socialMediaLinks {
          raw
        }
        gallery {
          galleryImage {
            id
            url
          }
        }
        discoverLink
        discoverGraphic {
          url(
            transformation:{
              image: { resize: { width: 140, height: 156, fit: clip } }
            })
          id
        }
      }
    }
  }
  `

  const data = await graphQLClient.request(query, slugObj.variables);
  onSuccess(data);
}
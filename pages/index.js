import Head from "next/head";
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const [postsData, setPostsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  async function getPosts() {
    const response = await axios.get("/api/posts");
    setPostsData(response.data.posts);
  }

  function getTrimmedText(body) {
    if (body.length > 50) {
      return body.slice(0, 50) + "...";
    }
    return body;
  }
  function handlePostClick(id) {
    router.push(`/post/${id}`);
  }

  useEffect(() => {
    getPosts();
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  return (
    <>
      <Head>
        <title>Detrator</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <CircularProgress sx={{ color: "orange" }} />
        </Box>
      ) : (
        <Container
          sx={{
            mt: 2,
            p: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Grid spacing={2} container>
            {postsData?.map((e) => {
              return (
                <Grid
                  xs={12}
                  md={4}
                  onClick={() => handlePostClick(e.id)}
                  item
                  key={e.id}
                >
                  <Box
                    sx={{
                      border: 1,
                      borderRadius: "12px",
                      p: 2,
                      boxShadow: 1,
                    }}
                  >
                    <Typography sx={{ fontWeight: 600, fontSize: 18 }}>
                      {e.title}
                    </Typography>
                    <Typography sx={{ my: 1 }}>
                      {getTrimmedText(e.body)}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      <Typography sx={{ fontSize: 12 }}>Tags: </Typography>
                      {e?.tags?.map((x) => {
                        return (
                          <Box
                            sx={{
                              mx: 1,
                              border: 1,
                              borderRadius: "12px",
                              p: 1,
                            }}
                            key={x}
                          >
                            <Typography sx={{ fontSize: 12 }}>{x}</Typography>
                          </Box>
                        );
                      })}
                    </Box>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      )}
    </>
  );
}

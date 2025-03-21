"use client";
import { Box, Flex, Text, Button, Heading, Stack } from "@chakra-ui/react";
//Página Home
export default function Home() {
  return (
    <Box>
      <Heading
        as="h1"
        size="2xl"
        mb={4}
        fontWeight={"bold"}
        justifyContent={"center"}
        textAlign={"center"}
      >
        Página de Produtos
      </Heading>
      <Flex
        justify={"center"}
        textAlign={"center"}
        flexDirection={"column"}
        padding={"100px"}
      >
        <Text>
          Essa página mantém e atualiza os dados dos produtos cadastrados.
        </Text>
        <Stack
          align={"center"}
          justify={"center"}
          direction={"row"}
          padding={15}
        >
          <Text>Clique no botão para listar os produtos:</Text>
          <Button
            asChild
            background="black"
            color={"white"}
            size="md"
            className="rounded-md"
          >
            <a href={"/listaprodutos"}>Listar Produtos</a>
          </Button>
        </Stack>
      </Flex>
    </Box>
  );
}

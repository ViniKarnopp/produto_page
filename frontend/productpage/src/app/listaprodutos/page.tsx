"use client";
import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Text,
  Input,
  Field,
  NativeSelect,
} from "@chakra-ui/react";
import { ListProducts } from "@/EndPoints/ListProducts";
import { ListProductsFilters } from "@/EndPoints/ListProductsFilters";
import { useEffect, useState } from "react";
import { Flip, toast } from "react-toastify";

//Página que lista os produtos de acordo com os filtros Preço Mínimo, Preço Máximo e Categorias
//Interface de Produto para manter o formato que vem da API backend.
export interface ProductProps {
  ProductId: number;
  Nome: string;
  Descricao: string;
  Preco: number;
  Categoria: string;
  ImageBase64: string;
  ImageType: string;
}

export default function ListaProdutos() {
  //Estados utilizados para manter os dados vindo da API e os filtros.
  const [loading, SetLoading] = useState(false);
  const [dados, setDados] = useState<ProductProps[]>();
  const [precoMinimo, setPrecoMinimo] = useState("");
  const [precoMaximo, setPrecoMaximo] = useState("");
  const [categoria, setCategoria] = useState("");

  //Função que carrega os dados da API quando a página é carregada.
  //Lista todos os produtos sem filtros.
  useEffect(() => {
    const fetchData = async () => {
      SetLoading(true);
      const response: ProductProps[] = await ListProducts();
      setDados(response);
      SetLoading(false);
    };
    fetchData();
  }, []);

  //Toast para mostrar mensagens de erro.
  const showToastWarning = (msg: string) => {
    toast.warning(msg, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "light",
      transition: Flip,
    });
  };

  //Método que busca os produtos com base nos filtros.
  const BuscarComFiltro = async (event: any) => {
    if (
      (precoMinimo == "" || precoMinimo == "0") &&
      (precoMaximo == "" || precoMaximo == "0")
    ) {
      SetLoading(true);
      const response = await ListProductsFilters(0, 0, categoria);
      setDados(response);
      SetLoading(false);
    } else {
      const precoMin = Number(precoMinimo);
      const precoMax = Number(precoMaximo);
      //Testar se Preço Mínimo e Máximo é positivos.
      if (precoMin < 0 || precoMax < 0) {
        showToastWarning(
          "Preço Mínimo e Preço Máximo devem ter valores positivos"
        );
        return [];
      } else {
        //Testar se Preço Mínimo e Máximo foram informados.
        // Zero é considerado quando o usuário não informou valor.
        if (precoMax == 0 && precoMin == 0) {
          SetLoading(true);
          const response = await ListProductsFilters(0, 0, categoria);
          setDados(response);
          SetLoading(false);
        } else {
          console.log("Entrou no else de preços iguais a 0");
          //Testar se o preço máximo é maior que o preço mínimo
          if (precoMax <= precoMin) {
            showToastWarning("Preço Máximo deve ser maior que Preço Mínimo");
            return [];
          }
        }
        //Função que busca os produtos com base nos filtros na API backend.
        SetLoading(true);
        const response = await ListProductsFilters(
          precoMin,
          precoMax,
          categoria
        );
        setDados(response);
        SetLoading(false);
      }
    }
  };
  return (
    <Box>
      <Heading
        size="3xl"
        alignItems="center"
        fontWeight="bold"
        className="mt-5 mb-2"
      >
        Produtos
      </Heading>
      <Flex>
        <Field.Root>
          <Field.Label>Preço Mínimo</Field.Label>
          <Input
            type="number"
            name="precoMinimo"
            step="0.01"
            min="0"
            size="sm"
            borderColor="black"
            borderRadius="sm"
            placeholder="Preço Mínimo"
            onChange={(event) => {
              setPrecoMinimo(event.target.value);
            }}
          />
        </Field.Root>
        <Field.Root>
          <Field.Label>Preço Máximo</Field.Label>
          <Input
            type="number"
            name="precoMaximo"
            step="0.01"
            size="sm"
            min="0"
            placeholder="Preço Máximo"
            onChange={(event) => {
              setPrecoMaximo(event.target.value);
            }}
          />
        </Field.Root>
        <Field.Root>
          <Field.Label>Categoria</Field.Label>
          <NativeSelect.Root size="sm">
            <NativeSelect.Field
              placeholder="Selecione uma Categoria"
              name="categoriaProduto"
              maxInlineSize="sm"
              onChange={(event) => {
                setCategoria(event.target.value);
              }}
            >
              <option value="">Todas as Categorias</option>
              <option value="Eletrônico">Eletrônico</option>
              <option value="Roupas">Roupas</option>
              <option value="Alimentos">Alimentos</option>
              <option value="Livros">Livros</option>
              <option value="Outros">Outros</option>
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Field.Root>
        <Button
          className="bg-zinc-900 text-white p-1 rounded-md"
          alignSelf="flex-end"
          onClick={BuscarComFiltro}
        >
          Buscar
        </Button>
      </Flex>
      <Flex className="mt-5">
        <Flex className="flex flex-col gap-4 mx-2">
          {dados?.map((p) => (
            <Box key={p.ProductId} className="bg-gray-200 p-4 rounded-md">
              <Heading size="md">Nome: {p.Nome}</Heading>
              <Text>Descrição: {p.Descricao}</Text>
              <Text>Preço: R$ {p.Preco}</Text>
              <Text>Categoria: {p.Categoria}</Text>
              <Link
                textDecoration={"underline"}
                href={"/listaprodutos/" + p.ProductId}
              >
                Detalhes do Produto
              </Link>
            </Box>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
}

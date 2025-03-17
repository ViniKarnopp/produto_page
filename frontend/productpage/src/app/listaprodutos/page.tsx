"use client";
import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Text,
  Toast,
  Input,
  Textarea,
  Fieldset,
  Stack,
  Field,
  NativeSelect,
  HStack,
  List,
} from "@chakra-ui/react";
import { ListProducts } from "@/EndPoints/ListProducts";
import { ListProductsFilters } from "@/EndPoints/ListProductsFilters";
import { useEffect, useState } from "react";
import { Flip, toast } from "react-toastify";

export interface ProductProps {
  ProductId: number;
  Nome: string;
  Descricao: string;
  Preco: number;
  Categoria: string;
  PhotoBase64: string;
  PhotoType: string;
}

export default function ListaProdutos() {
  const [loading, SetLoading] = useState(false);
  const [filtros, SetFiltros] = useState(false);
  const [dados, setDados] = useState<ProductProps[]>();
  const [precoMinimo, setPrecoMinimo] = useState("");
  const [precoMaximo, setPrecoMaximo] = useState("");
  const [categoria, setCategoria] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      SetLoading(true);
      const response :ProductProps[] = await ListProducts();
      console.log(response);
      setDados(response);
      console.log(dados);
      SetLoading(false);
    };
    fetchData();
  }, []);

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
  const BuscarComFiltro = async (event: any) => {
    if (precoMinimo == "" && precoMaximo == "") {
      SetLoading(true);
      const response = await ListProductsFilters(0, 0, categoria);
      setDados(response);
      SetLoading(false);
    }
    const precoMin = Number(precoMinimo);
    const precoMax = Number(precoMaximo);
    //Testar se Preço Mínimo e Máximo é maior que zero
    if (precoMin < 0 || precoMax < 0) {
      showToastWarning("Preço Mínimo e Preço Máximo devem ter valores positivos");
      /*toaster.create({
        title: "Preço Mínimo e Preço Máximo devem ter valores positivos",
        type: "warning",
        duration: 3000,
        action: {
          label: "Undo",
          onClick: () => toaster.resume(),
        },
      });*/
      return [];
    }
    //Testar se o preço máximo é maior que o preço mínimo
    if (precoMax <= precoMin) {
      showToastWarning("Preço Máximo deve ser maior que Preço Mínimo");
      /*toaster.create({
        title: "Preço Máximo deve ser maior que Preço Mínimo",
        type: "warning",
        duration: 3000,
        action: {
          label: "Undo",
          onClick: () => toaster.resume(),
        },
      });*/
      return [];
    }
    SetLoading(true);
    const response = await ListProductsFilters(precoMin, precoMax, categoria);
    setDados(response);
    SetLoading(false);
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
        <Stack direction="row">
          <Field.Root>
            <Field.Label>Preço Mínimo</Field.Label>
            <Input
              type="number"
              name="precoMinimo"
              step="0.01"
              min="0"
              width="sm"
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
              width="sm"
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
                <option value="Eletrônicos">Eletrônicos</option>
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
        </Stack>
      </Flex>
      <Flex className="mt-5">
        <Flex className="flex flex-col gap-4 mx-2">
          {dados?.map((p) => (
            <Box key={p.ProductId} className="bg-gray-200 p-4 rounded-md">
              <Heading size="md">Nome: {p.Nome}</Heading>
              <Text>Descrição: {p.Descricao}</Text>
              <Text>Preço: R$ {p.Preco}</Text>
              <Text>Categoria: {p.Categoria}</Text>
              <Link href={"/listaprodutos/" + p.ProductId}>
                Detalhes do Produto
              </Link>
            </Box>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
}
/*
return (
    <div>
        <h1 className="text-center mt-5 mb-2 font-bold text-3xl">
            Produtos
        </h1>
        <h3 className="mx-2">Buscar Produtos</h3>
        <form className="flex gap-2 my-4 mx-2">
          <span>Preço Mínimo: </span>
          <input
          className="border border-gray-200"
          type="number"
          name="PrecoMinimo"
          min="0"
          step="0.01"
          />
          <span> Preço Máximo: </span>
          <input
          className="border border-gray-200"
          type="number"
          name="PrecoMaximo"
          min="0"
          step="0.01"
          />
          <span className="align-center"> Categoria: </span>
          <select
          className="border border-gray-200"
          name="Categoria"
          >
            <option value="">Todas</option>
            <option value="Eletrônico">Eletrônico</option>
            <option value="Roupas">Roupas</option>
            <option value="Alimentos">Alimentos</option>
            <option value="Livros">Livros</option>
            <option value="Outros">Outros</option>
          </select>
          <button
          className="bg-zinc-900 text-white p-1 rounded-md"
          >Buscar</button>
        </form>
        <div className="flex flex-col gap-4 mx-2">
            {data.map(p => (
                <div key={p.productId} className="bg-gray-200 p-4 rounded-md">
                    <h2>Nome: {p.nome}</h2>
                    <p>Descrição: {p.descricao}</p>
                    <p>Preço: R$ {parseFloat(p.preco.toString()).toFixed(2)}</p>
                    <p>Categoria: {p.categoria}</p>
                    <Link href={'/listaprodutos/' + p.productId}>Detalhes do Produto</Link>
                </div>
            ))}
        </div>
        
    </div>
  );
  */

import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Link,
    Select,
    Spinner,
    Text,
    useToast,
  } from "@chakra-ui/react";
  import { Form } from "@unform/web";
  import { FormHandles } from "@unform/core";
  import { useEffect, useRef, useState } from "react";
  import { FaAngleRight, FaPlus } from "react-icons/fa";
  import { useLocation, useNavigate } from "react-router-dom";
  import * as Yup from "yup";
  
  import Header from "../../../components/Header/Header";
  import InputField from "../../../components/InputField";
  import SelectField from "../../../components/SelectField";
  import SearchableSelect from "../../../components/SearchableSelect";
  import { getCompanies } from "../../../services/companyService";
  import { getProcessById, saveProcess } from "../../../services/processService";
  import { warnValidation } from "../../../services/utils";
  import { DateTime } from "luxon";
  import ProcessItem from "./components/processItem";
  import {
    ProcessItemViewModel,
    ProcessViewModel,
  } from "../../../models/Process";
  import { countries } from "../../../models/countries";
  
  interface FormDataProps {
    openingDate: Date | null;
    importMode: string;
    product: string;
    paymentCondition: string;
    totalInvoice: string;
    dischargePort: string;
    incoterm: string;
    countryOfOrigin: string;
    containerQuantity: string;
    ncm: string;
  }
  
  const schema = Yup.object().shape({
    type: Yup.string().required("Campo obrigatório"),
    exporter: Yup.string().required("Campo obrigatório"),
    customsAgent: Yup.string().required("Campo obrigatório"),
    containerNumber: Yup.string().required("Campo obrigatório"),
    status: Yup.string().required("Campo obrigatório"),
    openingDate: Yup.date().required("Campo obrigatório"),
    importMode: Yup.string().required("Campo obrigatório"),
    product: Yup.string().required("Campo obrigatório"),
    paymentCondition: Yup.string().required("Campo obrigatório"),
    totalInvoice: Yup.string().required("Campo obrigatório"),
    dischargePort: Yup.string().required("Campo obrigatório"),
    incoterm: Yup.string().required("Campo obrigatório"),
    countryOfOrigin: Yup.string().required("Campo obrigatório"),
    containerQuantity: Yup.string().required("Campo obrigatório"),
  });
  
  const SaveProcess = () => {
    const formRef = useRef<FormHandles>(null);
    const [loadingSave, setLoadingSave] = useState(false);
    const [loading, setLoading] = useState(true);
    const [country, setCountry] = useState("China");
    const [currency, setCurrency] = useState("USD");
    const [error, setError] = useState<string>();
    const [items, setItems] = useState<ProcessItemViewModel[]>([
      {
        ncm: "",
        quantity: undefined,
        product: "",
        unitValue: "",
      },
    ]);
    const [client, setClient] = useState<{
      id: string;
      name: string;
      cnpj: string;
    }>();
    const [process, setProcess] = useState<ProcessViewModel>();
  
    const location = useLocation();
    const id = new URLSearchParams(location.search).get("id");
  
    const get = async () => {
      if (id) {
        const response = await getProcessById(id);
        if (response) {
          const newCurrency = response.totalInvoice.split(" ")[0];
          setCurrency(newCurrency);
  
          setProcess({
            ...response,
            openingDate: DateTime.fromISO(response.openingDate).toFormat(
              "yyyy-LL-dd"
            ),
            shippingDate: DateTime.fromISO(response.shippingDate).toFormat(
              "yyyy-LL-dd"
            ),
            arrivalDate: DateTime.fromISO(response.arrivalDate).toFormat(
              "yyyy-LL-dd"
            ),
            totalInvoice: response.totalInvoice.replace(newCurrency + " ", ""),
          });
          setCountry(response.countryOfOrigin);
          setItems(
            response.items.map((i: any) => ({
              ...i,
              unitValue: i.unitValue.replace(newCurrency + " ", ""),
            }))
          );
          setClient({
            id: response.clientId,
            name: response.clientName,
            cnpj: response.clientCnpj,
          });
        }
      }
      setLoading(false);
    };
  
    useEffect(() => {
      get();
    }, [id]);
  
    const [clients, setClients] = useState<
      {
        id: string;
        name: string;
        cnpj: string;
      }[]
    >([]);
    const navigate = useNavigate();
    const toast = useToast();
  
    useEffect(() => {
      const getClients = async () => {
        const response = await getCompanies(false);
        if (response) setClients(response);
      };
      getClients();
    }, []);
  
    const handleSubmit = async (data: any) => {
      try {
        const body = {
          id,
          ...data,
          shippingDate:
            data.shippingDate.length > 0 ? data.shippingDate : undefined,
          countryOfOrigin: country,
          items: items.map((i) => ({
            ...i,
            unitValue: `${currency} ${i.unitValue}`,
          })),
          totalInvoice: `${currency} ${data.totalInvoice}`,
          clientId: client?.id,
        };
        setLoadingSave(true);
        await schema.validate(body, { abortEarly: false });
        const response = await saveProcess(body);
        if (response?.data.success) {
          toast({
            title: "Processo salvo.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          navigate("/processes");
        } else {
          toast({
            title: "Erro ao salvar processo.",
            description: response?.data.notifications[0],
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      } catch (err: any) {
        warnValidation(err, formRef.current);
      } finally {
        setLoadingSave(false);
      }
    };
  
    return (
      <Box height="100%" overflowX="hidden">
        <Header />
        <Flex
          height="100%"
          pb="64px"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          w="100%"
          backgroundColor="var(--main-bg-color)"
        >
          <Flex
            alignItems="center"
            mb="24px"
            pt="0"
            gap="8px"
            mt={{ base: "16px", md: "27px" }}
            width="90%"
          >
            <Link
              color="var(--icon-color)"
              onClick={() => navigate("/processes")}
              size="md"
            >
              Processos
            </Link>
            <FaAngleRight />
            {id && (
              <>
                <Link
                  color="var(--icon-color)"
                  onClick={() => navigate(`/process?id=${id}`)}
                  size="md"
                >
                  Detalhe do processo
                </Link>
                <FaAngleRight />
              </>
            )}
            <Text size="md">{id ? "Editar" : "Criar"} processo</Text>
          </Flex>
          <Flex width={{ base: "95%", md: "45%" }}>
            <Heading size="lg" mb="48px" fontWeight="normal">
              {id ? "Editar" : "Criar"} processo
            </Heading>
          </Flex>
          {loading ? (
            <Flex h="100vh" w="100vw">
              <Spinner />
            </Flex>
          ) : (
            <Form
              ref={formRef}
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                alignItems: "center",
              }}
              initialData={
                process ? process : { openingDate: DateTime.now().toJSDate() }
              }
            >
              <Box width={{ base: "95%", md: "45%" }}>
                <Flex
                  backgroundColor="white"
                  flexDirection="column"
                  padding={{ base: "24px", md: "32px" }}
                >
                  <FormControl>
                    <Box>
                      <FormLabel>Cliente: </FormLabel>
                      <SearchableSelect
                        defaultSelectValue={{
                          value: client?.id,
                          label: client?.name,
                          subLabel: client?.cnpj,
                        }}
                        options={clients.map((c) => ({
                          value: c.id,
                          label: c.name,
                          subLabel: c.cnpj,
                        }))}
                        name="clientId"
                        value={client?.id}
                        setValue={(value) => {
                          const selClient = clients.find(
                            (c) => c.id.toLowerCase() === value?.toLowerCase()
                          );
                          setClient(selClient);
                        }}
                      />
                      {client?.cnpj && <Text mt="12px">CNPJ: {client.cnpj}</Text>}
                    </Box>
                  </FormControl>
                  <FormControl>
                    <Box w="100%" mt={10}>
                      <FormLabel>Data de abertura: </FormLabel>
                      <InputField
                        type="date"
                        name="openingDate"
                        placeholder="Data de Abertura"
                      />
                    </Box>
                  </FormControl>
                  <FormControl>
                    <Box w="100%" mt={10}>
                      <FormLabel>Data de embarque: </FormLabel>
                      <InputField
                        type="date"
                        name="shippingDate"
                        placeholder="Data de embarque"
                      />
                    </Box>
                  </FormControl>
                  <FormControl>
                    <Box w="100%" mt={10}>
                      <FormLabel>Data de chegada: </FormLabel>
                      <InputField
                        type="date"
                        name="arrivalDate"
                        placeholder="Data de chegada"
                      />
                    </Box>
                  </FormControl>
                  <FormControl>
                    <Box w="100%" mt={10}>
                      <FormLabel>Empresa do processo: </FormLabel>
                      <SelectField
                        isReadOnly={!!id}
                        name="type"
                        placeholder="Empresa do processo"
                        options={[
                          { label: "CVF", value: 1 },
                          { label: "Alfa", value: 2 },
                        ]}
                      />
                    </Box>
                  </FormControl>
                  <FormControl>
                    <Box w="100%" mt={10}>
                      <FormLabel>CVF Ref (nº do processo): </FormLabel>
                      <Text>
                        Se não for preenchido, será criado um novo número na
                        sequencia conforme o tipo selecionado (CVF ou Alfa)
                      </Text>
                      <InputField
                        isReadOnly={!!id}
                        name="cvfRef"
                        placeholder="CVF Ref."
                        type="number"
                      />
                    </Box>
                  </FormControl>
                  <FormControl>
                    <Box w="100%" mt={10}>
                      <FormLabel>Modo de Importação: </FormLabel>
                      <SelectField
                        name="importMode"
                        placeholder="Modo de Importação"
                        options={[
                          { label: "Encomenda", value: "Encomenda" },
                          { label: "Compra", value: "Compra" },
                          { label: "Conta e Ordem", value: "Conta e Ordem" },
                        ]}
                      />
                    </Box>
                  </FormControl>
                  <FormControl>
                    <Box w="100%" mt={10}>
                      <FormLabel>Ref. do cliente: </FormLabel>
                      <InputField
                        name="clientRef"
                        placeholder="Ref. do cliente"
                      />
                    </Box>
                  </FormControl>
                  <FormControl>
                    <Box w="100%" mt={10}>
                      <FormLabel>Agente marítmo: </FormLabel>
                      <InputField
                        name="customsAgent"
                        placeholder="Agente marítmo"
                      />
                    </Box>
                  </FormControl>
  
                  <FormControl>
                    <Box w="100%" mt={10}>
                      <FormLabel>Exportador: </FormLabel>
                      <InputField name="exporter" placeholder="Exportador" />
                    </Box>
                  </FormControl>
                  <FormControl>
                    <Box w="100%" mt={10}>
                      <FormLabel>Produto: </FormLabel>
                      <InputField name="product" placeholder="Produto" />
                    </Box>
                  </FormControl>
                  <FormControl>
                    <Box w="100%" mt={10}>
                      <FormLabel>Nº do contêiner: </FormLabel>
                      <InputField
                        name="containerNumber"
                        placeholder="Nº do contêiner"
                      />
                    </Box>
                  </FormControl>
                  <FormControl>
                    <Box w="100%" mt={10}>
                      <FormLabel>Condição de Pagamento:</FormLabel>
                      <SelectField
                        w="100%"
                        name="paymentCondition"
                        placeholder="Condição"
                        options={[
                          {
                            value: "30/70",
                            label: "30/70",
                          },
                          {
                            value: "20/80",
                            label: "20/80",
                          },
  
                          {
                            value: "100",
                            label: "100",
                          },
                        ]}
                      />
                    </Box>
                  </FormControl>
  
                  <FormControl>
                    <Box w="100%" mt={10}>
                      <FormLabel>Total Invoice: </FormLabel>
                      <Flex>
                        <Select
                          w="100px"
                          value={currency}
                          onChange={(e) => setCurrency(e.target.value)}
                        >
                          <option value="USD">US$</option>
                          <option value="EUR">€</option>
                          <option value="BRL">R$</option>
                        </Select>
                        <InputField
                          mask="currency"
                          name="totalInvoice"
                          placeholder="Total invoice"
                        />
                      </Flex>
                    </Box>
                  </FormControl>
  
                  <FormControl>
                    <Box w="100%" mt={10}>
                      <FormLabel>Porto de Descarga: </FormLabel>
                      <InputField
                        name="dischargePort"
                        placeholder="Porto de Descarga"
                      />
                    </Box>
                  </FormControl>
  
                  <FormControl>
                    <Box w="100%" mt={10}>
                      <FormLabel>Incoterm: </FormLabel>
                      <SelectField
                        w="100%"
                        name="incoterm"
                        placeholder="Incoterm"
                        options={[
                          { label: "FOB", value: "FOB" },
                          { label: "EXW", value: "EXW" },
                          { label: "CFR", value: "CFR" },
                          { label: "CIF", value: "CIF" },
                          { label: "FCA", value: "FCA" },
                          { label: "CPT", value: "CPT" },
                          { label: "CIP", value: "CIP" },
                          { label: "DAP", value: "DAP" },
                          { label: "DPU", value: "DPU" },
                          { label: "DDP", value: "DDP" },
                        ]}
                      />
                    </Box>
                  </FormControl>
  
                  <FormControl>
                    <Box w="100%" mt={10}>
                      <FormLabel>País de Origem: </FormLabel>
                      <SearchableSelect
                        defaultSelectValue={{
                          label: country,
                          value: country,
                        }}
                        options={countries.portuguese.map((c) => ({
                          value: c.name,
                          label: c.name,
                        }))}
                        value={country}
                        setValue={(value) => setCountry(value)}
                        name="countryOfOrigin"
                        placeholder="País de Origem"
                      />
                    </Box>
                  </FormControl>
  
                  <FormControl>
                    <Box w="100%" mt={10}>
                      <FormLabel>Total de Contêineres: </FormLabel>
                      <InputField
                        name="containerQuantity"
                        placeholder="Total de Contêineres"
                      />
                    </Box>
                  </FormControl>
                  <FormControl>
                    <Box w="100%" mt={10}>
                      <FormLabel>Status: </FormLabel>
                      <SelectField
                        name="status"
                        placeholder="Status"
                        options={[
                          { label: "DOCUMENTAÇÃO", value: "DOCUMENTAÇÃO" },
                          { label: "LI", value: "LI" },
                          { label: "DI", value: "DI" },
                          { label: "EMBARQUE", value: "EMBARQUE" },
                          { label: "EM TRÂNSITO", value: "EM TRÂNSITO" },
                          {
                            label: "CHEGOU NO PORTO DE DESTINO",
                            value: "CHEGOU NO PORTO DE DESTINO",
                          },
                          {
                            label: "CHEGOU NO AEROPORTO DE DESTINO",
                            value: "CHEGOU NO AEROPORTO DE DESTINO",
                          },
                          { label: "MANIFESTADO", value: "MANIFESTADO" },
                          { label: "ARMAZENADO", value: "ARMAZENADO" },
                          { label: "DI REGISTRADA", value: "DI REGISTRADA" },
                          { label: "DESEMBARAÇADO", value: "DESEMBARAÇADO" },
                          { label: "EM CARREGAMENTO", value: "EM CARREGAMENTO" },
                          { label: "ENTREGUE", value: "ENTREGUE" },
                          {
                            label: "AGUARDANDO FECHAMENTO",
                            value: "AGUARDANDO FECHAMENTO",
                          },
                        ]}
                      />
                    </Box>
                  </FormControl>
                  <FormLabel mt="32px" position="relative">
                    Itens do processo:
                  </FormLabel>
                  <Flex gap="32px" flexDir="column">
                    {items.map((i, index) => (
                      <ProcessItem
                        {...{ error, setError, index, i, items, setItems }}
                      />
                    ))}
                  </Flex>
                  {error && items.length === 0 && (
                    <Text color="red.300">{error}</Text>
                  )}
  
                  <Button
                    w={{ base: "100%", md: "30%" }}
                    mt="32px"
                    onClick={() => {
                      setItems((items) => [
                        ...items,
                        {
                          ncm: "",
                          quantity: undefined,
                          product: "",
                          unitValue: "",
                        },
                      ]);
                      setError(undefined);
                    }}
                    backgroundColor="var(--icon-color)"
                    color="white"
                  >
                    <Flex gap="8px" alignItems="center">
                      <FaPlus /> Adicionar item
                    </Flex>
                  </Button>
                </Flex>
              </Box>
              <Flex w={{ base: "95%", md: "45%" }} justifyContent="flex-end">
                <Button
                  isLoading={loadingSave}
                  backgroundColor="var(--icon-color)"
                  type="submit"
                  onClick={() => {
                    if (
                      items.length === 0 ||
                      items.some(
                        (i) =>
                          (i.product?.length ?? 0) === 0 ||
                          (i.quantity?.length ?? 0) === 0 ||
                          (i.unitValue?.length ?? 0) === 0
                      )
                    ) {
                      setError("É necessário criar os items do processo");
                    }
                  }}
                  color="white"
                  mb="64px"
                  my="32px"
                >
                  Salvar
                </Button>
              </Flex>
            </Form>
          )}
        </Flex>
      </Box>
    );
  };
  
  export default SaveProcess;
  
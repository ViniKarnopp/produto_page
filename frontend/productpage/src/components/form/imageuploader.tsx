import React, { useState, useRef, ChangeEvent } from "react";
import {
  Box,
  Image,
  Input,
  Text,
  VStack,
  /*useToast,*/
  Center,
} from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import Compressor from "compressorjs";
import { FaPencilAlt, FaXing } from "react-icons/fa";
import { CloseIcon } from "@chakra-ui/icons";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ImageUploader = ({
  width,
  value,
  setValue,
}: {
  width?: string;
  value: string | undefined;
  setValue: (value?: string) => void;
}) => {
  const [preview, setPreview] = useState<string | undefined>(value);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  //const toast = useToast();

  const handleImageClick = () => {
    inputRef.current?.click();
  };

  const validateFile = (file: File): boolean => {
    if (!file.type.startsWith("image/")) {
      toaster.create({
        title: "Tipo de arquivo inválido",
        description: "Por favor subir uma imagem",
        type: "error",
        duration: 3000,
        /*isClosable: true,*/
        action: {
          label: "Undo",
          onClick: () => toaster.resume(),
        },
      });
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      toaster.create({
        title: "Imagem muito grande",
        description: "Imagem precisa ser menor que 5MB",
        type: "error",
        duration: 3000,
        /*isClosable: true,*/
        action: {
          label: "Undo",
          onClick: () => toaster.resume(),
        },
      });
      return false;
    }

    return true;
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!validateFile(file)) {
      event.target.value = "";
      return;
    }

    setIsLoading(true);

    new Compressor(file, {
      quality: 0.8,
      maxWidth: 1920,
      success: (compressedFile) => {
        const reader = new FileReader();
        reader.readAsDataURL(compressedFile);
        reader.onload = function () {
          if (reader.result) {
            setPreview(reader.result as string);
            setValue(reader.result as string);
          }
          setIsLoading(false);
        };
      },
      error: (err) => {
        console.error(err);
        toaster.create({
          title: "Compression failed",
          description: "Failed to compress the image",
          type: "error",
          duration: 3000,
          /*isClosable: true,*/
          action: {
            label: "Undo",
            onClick: () => toaster.resume(),
          },
        });
        setIsLoading(false);
      },
    });
  };

  return (
    <VStack /*spacing={4}*/ align="center">
      <Input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        ref={inputRef}
        display="none"
      />

      {preview ? (
        <Box cursor="pointer" position="relative">
          <Image
            src={preview}
            alt="Preview"
            width={width}
            height="auto"
            borderRadius="md"
            onClick={handleImageClick}
          />
          <Text
            position="absolute"
            bottom={2}
            onClick={handleImageClick}
            right={2}
            fontSize="sm"
            color="white"
            bg="blackAlpha.600"
            px={2}
            py={1}
            borderRadius="md"
          >
            <FaPencilAlt />
          </Text>
          {value && (
            <Text
              position="absolute"
              bottom={2}
              right={12}
              fontSize="sm"
              color="white"
              bg="blackAlpha.600"
              px={2}
              py={1}
              zIndex={10}
              borderRadius="md"
              onClick={(e) => {
                e.preventDefault();
                setValue(undefined);
                setPreview(undefined);
              }}
            >
              <CloseIcon />
            </Text>
          )}
        </Box>
      ) : (
        <Center
          border="2px dashed"
          borderColor="gray.300"
          borderRadius="md"
          w="100%"
          maxW="400px"
          h="200px"
          cursor="pointer"
          onClick={handleImageClick}
          _hover={{ borderColor: "blue.500" }}
        >
          <Text color="gray.500">
            {isLoading
              ? "Processando..."
              : "Clique para fazer upload da imagem"}
          </Text>
        </Center>
      )}
    </VStack>
  );
};

export default ImageUploader;

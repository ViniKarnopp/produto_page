import { Image,Box, ImageProps } from "@chakra-ui/react";
import NextImage from "next/image";

interface Props extends ImageProps {
    src: string | undefined;
    alt: string;
    width: number;
    height: number;
}

export default function ImageComponent({ src, alt, width, height, ...rest }: Props) {

    return (
         src ? (
                    <Box
                      style={{ position: "relative", width: width, height: height }}
                    >
                      <Image asChild style={{ objectFit: "contain" }}>
                        <NextImage
                          alt={alt}
                          src={src}
                          width={width}
                          height={height}
                        />
                      </Image>
                    </Box>
                  ) : (
                    <Box>No image available</Box>
                  )
    );
}
import Image from "next/image";
import tw from "tailwind-styled-components/dist/tailwind";
import { setViewMediaOpen, useServersState } from "../features/servers";
import { useAppDispatch } from "../redux/hooks";

export default function ViewMedia() {
  const { viewMedia } = useServersState();
  const dispatch = useAppDispatch();

  function closeWindow() {
    dispatch(setViewMediaOpen(false));
  }

  function stopPropagation(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
  }

  return (
    <Backdrop onClick={closeWindow}>
      <Container onClick={stopPropagation}>
        {viewMedia.type === "image" && viewMedia.src && (
          <StyledImage
            loader={() => viewMedia.src}
            src={viewMedia.src}
            width={992}
            height={609}
          />
        )}

        {viewMedia.type === "video" && viewMedia.src && (
          <StyledVideo
            src={viewMedia.src}
            autoPlay
            loop
            preload="auto"
            width={992}
            height={609}
          />
        )}
      </Container>
    </Backdrop>
  );
}

const Backdrop = tw.div`
  fixed w-full h-full bg-black bg-opacity-[0.85] z-20
`;

const Container = tw.div`
  fixed flex w-fit h-fit top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]
`;

const StyledImage = tw(Image)`
  object-contain
`;

const StyledVideo = tw.video`
  object-contain
`;

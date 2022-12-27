import { memo, useState } from "react"

import Box from "@mui/material/Box"

export default memo(function BarbellWallpaper() {
  const [isSrcBroken, setIsSrcBroken] = useState(false)

  if (isSrcBroken) return <></>

  return (
    <Box
      alt={
        "Barbell on the Floor by Leon Ardho from Pexels: " +
        "https://www.pexels.com/photo/barbell-on-the-floor-1552252/"
      }
      component="img"
      height="100%"
      onError={() => setIsSrcBroken(true)}
      position="absolute"
      src={
        "https://user-images.githubusercontent.com/51540371/" +
        "202918612-e2daf207-d8fc-45db-827e-8b44aff1b07b.jpg"
      }
      sx={{ objectFit: "cover" }}
      width="100%"
      zIndex={-1}
    />
  )
})

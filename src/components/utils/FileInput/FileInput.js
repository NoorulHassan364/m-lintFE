import React, { useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { toast } from "react-toastify";

function FileInput({
  label,
  name,
  formik,
  multiple,
  disabled = false,
  accept,
  validate,
  ...props
}) {
  const [selectedImage, setSelectedImage] = useState();
  const [imgArray, setImgArray] = React.useState([]);

  // This function will be triggered when the file field change
  const imageChange = (e) => {
    debugger;
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files);
    }
  };

  return (
    <Box display="flex" alignItems="center">
      <Box
        position="relative"
        overflow="hidden"
        display="inline-block"
        width={300}
        mr={2}
        sx={{ cursor: "pointer" }}
      >
        <Button
          variant="contained"
          color="primary"
          disabled={disabled}
          fullWidth
          {...props}
        >
          {label}
        </Button>
        <input
          type="file"
          name={name}
          accept={accept || "image/*"}
          style={{
            opacity: 0,
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
          disabled={disabled}
          onChange={(event) => {
            debugger;
            imageChange(event);
            // if (validate && typeof validate === "function") {
            //   let isValid = true;
            //   if (multiple) {
            //     isValid = validate(event.target.files);
            //   } else {
            //     isValid = validate(event.target.files[0]);
            //   }

            //   if (!isValid) {
            //     toast.error("Invalid file type");
            //     return;
            //   }
            // }

            formik.setFieldValue(
              name,
              multiple
                ? event.currentTarget.files
                : event.currentTarget.files[0]
            );
            if (multiple) {
              let array = [];
              for (let i = 0; i < event.currentTarget.files.length; i++) {
                debugger;
                array.push(event.currentTarget.files[i]);
              }
              setImgArray(array);
            }
          }}
          multiple={multiple}
        />
      </Box>
      {multiple ? (
        <Box>
          {imgArray.length > 0 &&
            imgArray?.map((file, index) => (
              <img
                src={URL.createObjectURL(file, { type: "image" })}
                style={{
                  width: "60px",
                  height: "60px",
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                }}
                alt="Thumb"
              />
            ))}
        </Box>
      ) : (
        // <Typography variant="caption" color="textSecondary">
        //   {formik.values[name] && formik.values[name].name}
        //   </Typography>
        formik.values.image && (
          <img
            src={URL.createObjectURL(formik.values.image)}
            style={{
              width: "60px",
              height: "60px",
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            }}
            alt="Thumb"
          />
        )
      )}
    </Box>
  );
}

export default FileInput;

// import React, { useState } from "react";
// import { Box, Button, Stack, Typography } from "@mui/material";
// import { toast } from "react-toastify";

// function FileInput({
//   label,
//   name,
//   formik,
//   multiple,
//   disabled = false,
//   accept,
//   validate,
//   ...props
// }) {
//   const [selectedImage, setSelectedImage] = useState();

//   // This function will be triggered when the file field change
//   const imageChange = (e) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setSelectedImage(e.target.files[0]);
//     }
//   };

//   return (
//     <Box display="flex" alignItems="center">
//       <Box
//         position="relative"
//         overflow="hidden"
//         display="inline-block"
//         width={200}
//         mr={2}
//         sx={{ cursor: "pointer" }}
//       >
//         <Button
//           variant="contained"
//           color="primary"
//           disabled={disabled}
//           fullWidth
//           {...props}
//         >
//           {label}
//         </Button>
//         <input
//           type="file"
//           name={name}
//           accept={accept || ".pdf, .doc, .xls"}
//           style={{
//             opacity: 0,
//             position: "absolute",
//             top: 0,
//             left: 0,
//             width: "100%",
//             height: "100%",
//           }}
//           disabled={disabled}
//           onChange={(event) => {
//             if (validate && typeof validate === "function") {
//               let isValid = true;
//               imageChange();
//               if (multiple) {
//                 isValid = validate(event.target.files);
//               } else {
//                 isValid = validate(event.target.files[0]);
//               }

//               if (!isValid) {
//                 toast.error("Invalid file type");
//                 return;
//               }
//             }

//             formik.setFieldValue(
//               name,
//               multiple
//                 ? event.currentTarget.files
//                 : event.currentTarget.files[0]
//             );
//           }}
//           multiple={multiple}
//         />
//       </Box>
//       {multiple ? (
//         <Stack>
//           {formik.values[name] &&
//             formik.values[name].length > 0 &&
//             formik.values[name].map((file, index) => (
//               <Typography variant="caption" color="textSecondary">
//                 {file.name}
//               </Typography>
//             ))}
//         </Stack>
//       ) : (
//         // <Typography variant="caption" color="textSecondary">
//         //   {formik.values[name] && formik.values[name].name}
//         //   </Typography>
//         {
//           /* formik.values.image && (
//           <img
//             src={URL.createObjectURL(formik.values.image)}
//             style={{ width: "60px", height: "60px" }}
//             alt="Thumb"
//           />
//         ) */
//         }
//       )}
//     </Box>
//   );
// }

// export default FileInput;

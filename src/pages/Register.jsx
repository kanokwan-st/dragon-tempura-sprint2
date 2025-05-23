import React, { useState } from "react";
import ButtonSubmit from "../components/ButtonSubmit";
import { Box, Button, FormGroup, Stack, Typography } from "@mui/material";
import InlineInput from "../components/InlineInput";
import axios from "axios";
import baseURL from "../../service/api";

export default function Register({ onClose, switchToLogin }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
 

  async function handleSubmit(e) {
    e.preventDefault();

    const isValidPhone = /^(\d{3}-\d{3}-\d{4}|\d{10})$/.test(phone);
    if (!isValidPhone) {
      alert("Phone number format should be 012-345-6789");
      return;
    }

    const passwordLength = password.length >= 8;
    const haveUpperCase = /[A-Z]/.test(password);
    const haveLowerCase = /[a-z]/.test(password);

    
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !password ||
      !confirmPassword
    ) {
      alert("Please fill in all fields.");
      return;
    }
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValidEmail) {
      alert("Please enter a valid email address");
      return;
    }
    
    if (password !== confirmPassword) {
      const errorDiffPassword = "Passwords do not match!";
      alert(errorDiffPassword);
      return;
    }
    if (!passwordLength || !haveUpperCase || !haveLowerCase) {
      const errorPassword =
        "Password must have longer than 8 characters and have uppercase and lowercase letter";
      alert(errorPassword);
      return;
    }

    const newUser = {
      firstName,
      lastName,
      email,
      phone,
      password,
    };

    try {
      const res = await axios.post(
        `${baseURL}/api/users-register`,
        newUser
      );
      alert("Register success, Welcome to Collectico!");
        switchToLogin(newUser.email, newUser.password);
        onClose();
    } catch (err) {
      if (err.response) {
        alert(err.response.data.message || "Login failed");
      } else {
        alert("Something went wrong, please try again later ;-;");
      }
      console.error(err);
    }
  }
  return (
    <Box
      fullWidth
      maxWidth="2000px"
      sx={{
        bgcolor: "primary.mainSectionRegister",
        gap: "12px",
        py: "42px",
        px: "82px",
        border: "4px solid white",
        borderRadius: "20px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div class="flex flex-col justify-center items-center gap-[8px]">
        <img src="https://res.cloudinary.com/dnkaoicoo/image/upload/v1747275164/u1qjduxtlkxl1e9bl4tw.png" className="w-[60px] pb-[12px]" />
        <Typography
          sx={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "primary.main",
          }}
        >
          Welcome back
        </Typography>
        <Typography
          sx={{ py: "8px", fontSize: "0.75rem", color: "primary.fontGray" }}
        >
          Welcome back to Collectico — your creative journey continues here.
        </Typography>
      </div>
      <form onSubmit={handleSubmit}>
        <FormGroup
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: {xs:"center"},
            pt: "16px",
            color: "primary.main",
            gap: 8,
          }}
        >
          <Stack sx={{ gap: 0.5 , display:{xs:"flex"} }}>
            <InlineInput
              type={"text"}
              label={"First Name"}
              placeholder={"Enter your first name"}
              fontWeight={"bold"}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <InlineInput
              type={"text"}
              label={"Last Name"}
              placeholder={"Enter your last name"}
              fontWeight={"bold"}
              onChange={(e) => setLastName(e.target.value)}
            />
            <InlineInput
              type={"email"}
              label={"E-mail"}
              placeholder={"Enter your email"}
              fontWeight={"bold"}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InlineInput
              type={"phone"}
              label={"Phone Number"}
              placeholder={"012-345-6789"}
              fontWeight={"bold"}
              onChange={(e) => setPhone(e.target.value)}
            />
            <InlineInput
              type={"password"}
              label={"Password"}
              placeholder={"Enter your password"}
              fontWeight={"bold"}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InlineInput
              required
              type={"password"}
              label={"Re-Password"}
              placeholder={"Enter your password"}
              fontWeight={"bold"}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Stack>

          <Stack
            sx={{
              display: {md:"flex" , xs:"none"},
              justifyContent: "center",
              alignItems: "center",
              gap: 4,
            }}
          >
            <Stack
              width={156}
              height={180}
              sx={{
                bgcolor: "primary.backgroundImgae",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className=" h-24 w-24 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </Stack>
            <Button
              disabled
              sx={{
                bgcolor: "primary.buttonUpImage",
                border: "1px solid",
                borderColor: "primary.main",
                borderRadius: "12px",
                fontSize: "0.875rem",
                letterSpacing: "0.05em",
                color: "primary.text",
                textTransform: "none",
                transition: "all 0.3s ease",
                "&:hover": {
                  cursor: "pointer",
                  bgcolor: "primary.buttonUpImageHover",
                  border: "1px solid primary.buttonUpImageHover",
                  color: "primary.hoverText",
                },
              }}
            >
              Upload image
            </Button>
          </Stack>
        </FormGroup>

        <Stack
          marginY={2}
          spacing={12}
          justifyContent={"center"}
          direction={"row"}
        >
          <Box
            sx={{
              fontSize: "0.875rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box sx={{color: "primary.fontGray",
              ":hover": {
                cursor:"pointer",
              }
            }} onClick={switchToLogin}>Already have an account</Box>
          </Box>
          <ButtonSubmit type="submit" width={"120px"} label={"Sign up"} />
        </Stack>
      </form>
    </Box>
  );
}

import React, { ReactNode, useEffect, useState } from "react";
import Axios from "axios";
import AmtilIcon from "images/transp_amtilogo.png";
import { FaUser, FaSearch } from "react-icons/fa";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Image,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import Linkr from "react-router-dom";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

import "./Navigation.scss";

const Links = ["Courses", "Chapters", "Lessons", "Sections"];

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
    }}
    href={"#"}
  >
    {children}
  </Link>
);

export function Navigation() {
  Axios.defaults.withCredentials = true;
  const [user, setUser] = useState({
    username: "",
    userid: "",
    userfName: "",
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (window.sessionStorage.getItem("user")) {
      setUser(JSON.parse(window.sessionStorage.getItem("user")));
    }
  }, []);

  return (
    <>
      <Box bg={useColorModeValue("blue.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-around"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          {/* Main Nav */}
          <HStack spacing={8} alignItems={"center"}>
            <Box>
              <Link href={"/"}>
                <Image
                  boxSize="50px"
                  objectFit="cover"
                  src={AmtilIcon}
                  alt="AMTIL Logo"
                />
              </Link>
            </Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              <Link href="/courses">Courses</Link>
              <Link href="/chapters">Chapters</Link>
              <Link href="/lessons">Lessons</Link>
              <Link href="/sections">Sections</Link>
            </HStack>
            {/* Search Input */}
            <Flex alignItems={"center"}>
              <div className="nav-search">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search here"
                  className="nav-input"
                />
              </div>
            </Flex>
            {/* Profile Menu */}
            <Flex alignItems={"center"}>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  {user.userid ? (
                    <Avatar
                      size={"sm"}
                      src={
                        "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                      }
                    />
                  ) : (
                    <FaUser size={20} className="profile-icon" />
                  )}
                </MenuButton>
                <MenuList>
                  <MenuItem>Profile Link 1</MenuItem>
                  <MenuItem>Profile Link 2</MenuItem>
                  <MenuDivider />
                  <MenuItem>Profile Link 3</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </HStack>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}

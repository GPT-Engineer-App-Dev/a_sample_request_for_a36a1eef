import React, { useState } from "react";
import { Box, Button, Container, FormControl, FormLabel, Input, Text, VStack, useToast, useClipboard } from "@chakra-ui/react";
import { FaPrint } from "react-icons/fa";

const Index = () => {
  const [formData, setFormData] = useState({
    email: "",
    sampleInfo: "",
  });
  const [uniqueNumber, setUniqueNumber] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const toast = useToast();
  const { hasCopied, onCopy } = useClipboard(uniqueNumber);

  // Generate a unique number based on the current timestamp
  const generateUniqueNumber = () => {
    return `CYK${Date.now()}`;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newUniqueNumber = generateUniqueNumber();
    setUniqueNumber(newUniqueNumber);
    setIsSubmitted(true);

    // TODO: Implement email automation to send form data to both the customer and samplerequest@cyklop.nl

    // Display success toast message
    toast({
      title: "Form submitted.",
      description: `A unique tracking number has been generated: ${newUniqueNumber}`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  // Update form data state
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Print Shipping Label
  const printShippingLabel = () => {
    // TODO: Implement printing functionality
    toast({
      title: "Printing Shipping Label",
      description: "The shipping label is being printed.",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box bg="#002F5D" minH="100vh" color="white">
      <Container maxW="container.md" py={10}>
        {!isSubmitted ? (
          <Box as="form" onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Email Address</FormLabel>
                <Input type="email" name="email" value={formData.email} onChange={handleChange} bg="white" color="black" />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Sample Information</FormLabel>
                <Input type="text" name="sampleInfo" value={formData.sampleInfo} onChange={handleChange} bg="white" color="black" />
              </FormControl>
              <Button type="submit" colorScheme="green" bg="#6CB42C" leftIcon={<FaPrint />}>
                Submit
              </Button>
            </VStack>
          </Box>
        ) : (
          <VStack spacing={4}>
            <Text>
              Your unique tracking number is: <strong>{uniqueNumber}</strong>
            </Text>
            <Button onClick={onCopy} colorScheme="green" bg="#6CB42C">
              {hasCopied ? "Copied!" : "Copy Tracking Number"}
            </Button>
            <Button onClick={printShippingLabel} colorScheme="green" bg="#6CB42C" leftIcon={<FaPrint />}>
              Print Shipping Label
            </Button>
            {uniqueNumber && <Text>Cyklop CSC Att.: SampleLab M.Slot [{uniqueNumber}] Wilhelm Röntgenstraat 10, 8013NC, Zwolle, Nederland</Text>}
          </VStack>
        )}
      </Container>
    </Box>
  );
};

export default Index;

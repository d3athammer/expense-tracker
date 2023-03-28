import { Flex, Button, Select, FormControl, FormLabel, FormHelperText, Input, InputGroup, InputLeftElement, Box } from '@chakra-ui/react'

const Form = () => {

  return (
    <form className="container mt-4">
      <Box ms={4}>
        <FormControl>
          <FormLabel>Description</FormLabel>
            <Input type='text' />
        </FormControl>
      </Box>
      <Box ms={4} mt={2}>
        <FormLabel>Amount</FormLabel>
        <FormControl>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              fontSize="1.2em"
              color="gray.300"
              children="$"
            />
            <Input type="number" placeholder="Enter amount" />
          </InputGroup>
        </FormControl>
      </Box>
      <Box ms={4} mt={2}>
        <FormControl>
          <FormLabel>Category</FormLabel>
          <Select placeholder=" ">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
        </FormControl>
      </Box>
      <Button ms={4} mt={4} colorScheme='blue' type='submit'>Button</Button>
    </form>
  )
}

export default Form;

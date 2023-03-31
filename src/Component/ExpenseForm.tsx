import { Flex, Button, Select, FormControl, FormLabel, FormHelperText, Input, InputGroup, InputLeftElement, Box } from '@chakra-ui/react'
import categories from "./Categories"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod'

// set validation
const schema = z.object({
  description: z.string( {}).min(3, { message: 'Description must be at least 3 characters' }).max(50),
  amount: z.number({ invalid_type_error: 'amount is required'}).min(0.01).max(100_000),
  category: z.enum(categories, {
    errorMap: () => ( {message: "Category is required."})
  })
})

interface Props {
  onSubmit: (data: ExpenseFormData) => void;
}

type ExpenseFormData = z.infer<typeof schema>;


const Form = ({ onSubmit } : Props ) => {
  // calling reset from react hook form allows us to clear the form
  const { reset, register, handleSubmit, formState: {errors} } = useForm<ExpenseFormData>({ resolver: zodResolver(schema)})

  return (
    <div className="container mt-4">
      <div className="topside">
        {/* they are JavaScript expressions that need to be evaluated.
        The curly braces allow JavaScript expressions to be embedded inside JSX. */}
        <form onSubmit={handleSubmit(data=> {
          onSubmit(data);
          reset();
          })}>
          <Box display="flex" flexDirection="column" ms={4}>
            <FormControl>
              <FormLabel>Description</FormLabel>
                <Input {...register('description')} id="description" type='text' />
                {errors.description && <p className='text-danger'>{errors.description.message}</p>}
            </FormControl>
          </Box>
          <Box ms={4} mt={2}>
            <FormControl >
              <FormLabel>Amount</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  fontSize="1.2em"
                  color="gray.300"
                  children="$"
                />
                <Input {...register('amount', { valueAsNumber: true})} id="amount" type="number" />
              </InputGroup>
                {errors.amount && <p className='text-danger'>{errors.amount.message}</p>}
            </FormControl>
          </Box>
          <Box ms={4} mt={2}>
            <FormControl>
              <FormLabel>Category</FormLabel>
              <Select {...register('category')} id="category" placeholder=" ">
                <option value=" "></option>
                {categories.map((category) =>
                  <option key={category} value={category}>{category}</option>
                )}
              </Select>
              {errors.category && <p className='text-danger'>{errors.category.message}</p>}
            </FormControl>
          </Box>
          <Button ms={4} mt={4} mb={4} colorScheme='blue' type='submit'>Submit</Button>
        </form>
      </div>
    </div>
  )
}

export default Form;

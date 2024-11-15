import { Flex, Text } from '@radix-ui/themes';
import { useEffect, useState } from 'react';

const Message = ({
  message,
  className,
}: {
  message: string;
  className?: string;
}) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timeout);
  }, []);

  const splitedMessage = message.split('/newline/').map((item, index) => (
    <Text key={index}>
      <Text align='center'>{item}</Text>
      <br />
    </Text>
  ));

  return (
    <Flex align='center' justify='center' className={className}>
      <Flex align='center' justify='center'>
        {loading && <p>Spinner</p>}
        <Text align='center' as='p'>
          {loading ? 'Loading...' : splitedMessage}
        </Text>
      </Flex>
    </Flex>
  );
};

export default Message;

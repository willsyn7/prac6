// // You are serving `index.js` to the client for use on the page, but there is not much existing functionality. Add code to achieve the following:

// // - [ ] After the page has initially loaded, all messages from the database should 
// be displayed as list items in the `#message-list` element. These list items should display the message item followed by a `button`
//  (inside the list item) with a class of `del` and display the word `Delete`. As an example, one list item might look like


async function fetchMessages() {
    try {
      const response = await fetch('http://localhost:3434/message');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const messages = await response.json();
      console.log('Fetched messages:', messages); 
      return messages;
    } catch (error) {
      console.error('Error fetching messages:', error);
      return [];
    }
  }

  function displayMessages(messages) {
    const messageList = document.getElementById('message-list');
    const existingMessages = new Set();
  
    messageList.querySelectorAll('li').forEach(item => {
      existingMessages.add(item.textContent.replace('Delete', '').trim());
    });
  
    messages.forEach(message => {
      if (!existingMessages.has(message.message)) {
        const listItem = document.createElement('li');
        listItem.textContent = message.message;
  
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'del';
        deleteButton.addEventListener('click', () => {
          deleteMessage(listItem);
        });
  
        listItem.appendChild(deleteButton);
        messageList.appendChild(listItem);
      }
    });
  }

  document.addEventListener('DOMContentLoaded', async () => {
    const messages = await fetchMessages();
    displayMessages(messages);
  });


//   - [ ] The application should poll for new messages from the database 
//   every two seconds and display them. Messages should not display in the list multiple times
setInterval(async () => {
    const messages = await fetchMessages();
    displayMessages(messages);
  }, 2000);


  document.getElementById('save').addEventListener('click', async () => {
    const password = document.getElementById('pass').value;
    console.log(password ,'<-password');
    console.log('save button pressed');
    const description = document.getElementById('desc').value;
    console.log(description);
  
    try {
      const response = await fetch('http://localhost:3434/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          message: description,
          password: password
        })
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const newMessage = await response.json();
      console.log('Message saved:', newMessage);
      const messages = await fetchMessages();
      displayMessages(messages);
    } catch (error) {
      console.error('Error saving message:', error);
    }
  });




  async function deleteMessage(listItem) {
    const messageList = document.getElementById('message-list');
    const messageContent2 = listItem.textContent.replace('Delete', '').trim(); //was trying to extract the string to send in body 
    console.log(messageContent2)
    console.log(messageList)
    const listItems = messageList.getElementsByTagName('li');
    const messageContent = listItem.value
    console.log(listItem)
    console.log(messageContent);
    try {
      const response = await fetch('http://localhost:3434/message', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: messageContent2 })
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      listItem.remove();
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  }
  








  

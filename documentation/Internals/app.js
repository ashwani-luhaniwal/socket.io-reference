/**
 * ----------------------
 * Socket.IO - Internals
 * ----------------------
 * 
 * ----------
 * Fallbacks
 * ----------
 * Socket.IO has a lot of underlying transport mechanisms, which deal with various constraints arising 
 * due to cross browser issues, WebSocket implementations, firewalls, port blocking, etc.
 * 
 * Though W3C has a defined specification for WebSocket API, it is still lacking in implementation. 
 * Socket.IO provides us with fallback mechanisms, which can deal with such issues. If we develop apps 
 * using the native API, we have to implement the fallbacks ourselves. Socket.IO covers a large list of 
 * fallbacks in the following order −
 *      WebSockets
 *      FlashSocket
 *      XHR long polling
 *      XHR multipart streaming
 *      XHR polling
 *      JSONP polling
 *      iframes
 * 
 * ---------------------------
 * Connection using Socket.IO
 * ---------------------------
 * The Socket.IO connection begins with the handshake. This makes the handshake a special part of the 
 * protocol. Apart from the handshake, all the other events and messages in the protocol are transferred 
 * over the socket.
 * 
 * Socket.IO is intended for use with web applications, and therefore it is assumed that these 
 * applications will always be able to use HTTP. It is because of this reasoning that the Socket.IO 
 * handshake takes place over HTTP using a POST request on the handshake URI (passed to the connect 
 * method).
 * 
 * --------------------
 * Events and messages
 * --------------------
 * WebSocket native API only sends messages across. Socket.IO provides an addition layer over these 
 * messages, which allows us to create events and again helps us develop apps easily by separating the 
 * different types of messages sent.
 * 
 * The native API sends messages only in plain text. This is also taken care of by Socket.IO. It handles 
 * the serialization and deserialization of data for us.
 * 
 * We have an official client API for the web. For other clients such as native mobile phones, other 
 * application clients also we can use Socket.IO using the following steps.
 *  Step 1 − A connection needs to be established using the same connection protocol discussed above.
 *  Step 2 − The messages need to be in the same format as specified by Socket.IO. This format enables 
 *           Socket.IO to determine the type of the message and the data sent in the message and some 
 *           metadata useful for operation.
 * 
 * The message format is −
 * 
 *      [type] : [id ('+')] : [endpoint] (: [data]
 * 
 * The parameters in the above command are explained below −
 *      Type: is a single digit integer, specifying what type message it is.
 *      ID: is message ID, an incremental integer used for acknowledgements.
 *      Endpoint: is the socket endpoint that the message is intended to be delivered to...
 *      Data: is the associated data to be delivered to the socket. In case of messages, it is treated 
 *            as plain text, for other events, it is treated as JSON.
 */
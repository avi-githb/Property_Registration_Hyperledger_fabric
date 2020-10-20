- Origin of Property Registration

Property registration is the process by which you register the documents related to a property of yours with legal entities. For instance, when you purchase a flat directly from a builder, property registration gives you the right to legally own, use or dispose of the property. When you have a legal ownership title over a property, there is a low likelihood of fraud or misappropriation. 
	
- Need for Property Registration

Property registration is required to maintain the ownership of land/property deeds. There are many reasons to get your property registered:
 • Avoid conflicts: Proper property registration helps individuals avoid conflicts arising from land disputes.
 • Maintain ownership: Property registration also helps to identify the rightful owner of a property.
 • Comply with legal processes: Many legal processes require individuals to furnish proper land deeds and documentation.

- Solution Using Blockchain

Blockchain is an immutable distributed ledger that is shared with everyone present on a network. Every participant interacts with the blockchain using a public-private cryptographic key combination. Moreover, the records stored on the blockchain are immutable, making them very hard to tamper with, thus providing better security. A solution like Hyperledger Fabric also offers the features to maintain users and roles, which additionally help secure and identify owners. 
	 
The government can utilise the feature set of a blockchain to reduce the difficulties faced in the traditional property registration process. A distributed ledger can be set up among the buyer, seller, bank, registration authority and notary. Property details can be stored in and accessed from the blockchain, and these details are immutable, meaning they cannot be altered by anybody.
	 
1. Stakeholders of the Network

There are two stakeholders involved in this case study: Users and Registrar. 
	 
1.1. Users are the people who wish to sell/buy the properties registered on this network. They need to be explicitly registered on the network to be able to buy/sell the properties registered on it.
	 
1.2. Registrar has multiple roles. For example, if a user wishes to register himself/herself on the system, then the registrar must validate the identity of the user before adding them to the system. Talking of another use case, suppose a user wishes to register their property on the network. They would first raise a request to the registrar who, in turn, will register the property on the ledger after validation.
	 
2. Logical Flow

The entire flow of this case study can be divided into three parts:
 2.1. User Registration
 2.2. Property Registration
 2.3. Property Transfer 
	 
We will look into each of these subparts individually.
	 
2.1. User Registration: This process comprises of the following steps:
	 
2.1.1. A user with permission to access the network raises a request to the registrar to store their data/credentials on the ledger.

2.1.2. The request gets stored on the ledger. 

2.1.3. The registrar reads the request and stores the user’s data/credentials on the ledger after validating their identity manually.  

2.1.4. There is a digital currency called ‘upgradCoins’ associated with each user’s account. All transactions on this network can be carried out only with this currency. When a user joins the network, he/she has 0 ‘upgradCoins’.
	 
2.2. Property Registration: This process comprises of the following steps: 
	 
2.2.1. A user added to the property registration system raises a request to the registrar to register their property on the network.

2.2.2. The request gets stored on the ledger.

2.2.3. The registrar reads the request and stores the property on the ledger after validating the data present in the request. For 
example, suppose Mr Garg registers himself on the network and raises a request to register his farmhouse in Lonavala. Now, the registrar needs to verify whether the property is real and whether it actually belongs to Mr Garg, before registering it on the ledger.

Note: In this process, the property gets only registered on the system. It can be purchased by other registered users only if its owner explicitly wishes to list it for sale. You will understand this better as you move ahead with the problem statement. 
	 
2.3 PropertyTransfer: This process comprises of the following steps:
	 
2.3.1. The owner of the property must put the property on sale.

2.3.2. The buyer of the property must ensure that the amount of ‘upgradCoins’ they have is greater than or equal to the price of the property. If not, then the user must recharge their account.

2.3.3. If the two criteria above are satisfied, then the ownership of the property changes from the seller to buyer and ‘upgradCoins’ equal to the price of the property are transferred from the buyer’s account to the seller's account.
	 
3. Assets on the ledger

3.1. Users: Each user’s data/credentials, such as name, email Id, Aadhar number, etc., need to be captured before they can be allowed to buy/sell properties on the network. The credentials of each user are stored as states on the ledger.

3.2. Requests: Recall that the users need to raise a request to the registrar in order to register themselves on the network or to buy property on the ledger. These requests get stored on the ledger.

3.3. Property: Properties owned by users registered on the network are stored as assets on the ledger.
	
	
	
	
	

'use strict';



const { Contract } = require('fabric-contract-api');

const { use } = require('chai');



class UserContract extends Contract {



  constructor() {

    // Provide a custom name to refer to this smart contract

    super('org.property-registration-network.user');

  }



  /* ****** All custom functions are defined below ***** */



  // This is a basic user defined function used at the time of instantiating the smart contract



  // to print the success message on console



  async instantiate(ctx) {



    console.log('Regnet Smart Contract Instantiated');



  }


  /**

 * Create a new user account on the network

 * @param ctx - The transaction context object

 * @param name - Name of the user

 * @param email - Email ID of the user

   * @param PhoneNumber - Phone number of the user

   * @param Aadhar - Aadhar number of the user

 * @return - returns new user object type

 */

  async requestNewUser(ctx, name, emailID, phoneNumber, aadharNumber) {
    //to chekc if only users peer are used to interact with this function
    if (ctx.clientIdentity.getMSPID() != "usersMSP") {
      return "Users should be used to raise a user or property registration request";
    }

    //creating composite key for Requesting a user

    const userKey = ctx.stub.createCompositeKey('org.property-registration-network.regnet.requestUser', [name + '-' + aadharNumber]);



    //check if this user have already requested for Registration

    let userCheck = await ctx.stub.getState(userKey).catch(err => console.log(err));

    try {

      let userCheckBuffer = JSON.parse(userCheck.toString());
      //if the user exist then print user have already registered.
      return "This user have already requested for Registration";

    }

    catch (err) {
      //if user doesn't exist we will get a JSON incomplete error, catch the error and add user request


      let newUserObject = {

        name: name,

        emailID: emailID,

        phoneNumber: phoneNumber,

        aadharNumber: aadharNumber,

        createdAt: new Date()

      };

      // Convert the JSON object to a buffer and send it to blockchain for storage

      let dataBuffer = Buffer.from(JSON.stringify(newUserObject));

      await ctx.stub.putState(userKey, dataBuffer);

      return newUserObject;

    }
  }


  /**

 * Recharge user account

 * @param ctx - The transaction context object

 * @param name - Name of the user

 * @param aadharNumber - Email ID of the user

   * @param bankTransactionID - Phone number of the user

 * @return - the user object which have the updated upGrad coin value

 */


  async rechargeAccount(ctx, name, aadharNumber, bankTransactionID) {

    if (ctx.clientIdentity.getMSPID() != "usersMSP") {
      return "Users should be used to recharge accounts";
    }
    //create composite key for approved user
    const approvedUserKey = ctx.stub.createCompositeKey('org.property-registration-network.regnet.approvedUser', [name + '-' + aadharNumber]);

    let approvedUserBuffer = await ctx.stub.getState(approvedUserKey).catch(err => console.log(err));

    try {
      //checking if this user is already approved and is present in the network
      //if user is not approved we will go to catch block and return string updating user to first get the account approved
      let approvedUserData = JSON.parse(approvedUserBuffer.toString());

      //If loop to limit the bankTransaction ID to upg100, upg500 or upg1000 anything else will result in invalid BANK transaction
      let coinValue = 0;

      if (bankTransactionID == "upg100") {

        coinValue = 100;

      }

      else if (bankTransactionID == "upg500") {

        coinValue = 500;

      }

      else if (bankTransactionID == "upg1000") {

        coinValue = 1000;

      }

      else {

        return "Invalid Bank Transaction ID";

      }

      //adding the coin value to upGrad coins and storing the details on ledger
      approvedUserData.upGradCoins += coinValue;

      let dataBuffer = Buffer.from(JSON.stringify(approvedUserData));

      await ctx.stub.putState(approvedUserKey, dataBuffer);

      return approvedUserData;

    }

    catch (err) {

      return "This user is not Approved to make any transcations on this network, Please make sure the user is Approved by a Registrar";

    }
  }

  /**

 * View Approved user

 * @param ctx - The transaction context object

 * @param name - Name of the user
 * @param Aadhar - Aadhar number of the user

 * @return - returns user object

 */

  async viewUser(ctx, name, aadharNumber) {

    const approvedUserKey = ctx.stub.createCompositeKey('org.property-registration-network.regnet.approvedUser', [name + '-' + aadharNumber]);

    let userBuffer = await ctx.stub.getState(approvedUserKey).catch(err => console.log(err));

    try {
      //if user exist return user as JSON onj, else go in catch block and retunr user doesn't exist.
      return JSON.parse(userBuffer.toString());

    }

    catch (err) {

      return "This user is either not approved or doesn't exist in the Registered network, Please raise a user Registration request and then have the user approved by a Registrar";

    }

  }


  /**

* Request for property registration on the network

* @param ctx - The transaction context object

* @param propertyId - unique ID of the property format (XXX)

* @param owner - Name of the owner

* @param price - Property price

* @param status - registered or onSale

* @param name - Name of the user

* @param email - Email ID of the user

* @param Aadhar - Aadhar number of the user

* @return - returns property request object

*/

  //Property Registration

  async propertyRegistrationRequest(ctx, propertyId, owner, price, status, name, aadharNumber) {

    //to chekc if only users peer are used to interact with this function
    if (ctx.clientIdentity.getMSPID() != "usersMSP") {
      return "Users should be used to raise property registration request";
    }
    //creat new composite property Request key

    const propertyKey = ctx.stub.createCompositeKey('org.property-registration-network.regnet.requestPropertyKey', [propertyId]);

    let propertyDetails = await ctx.stub.getState(propertyKey).catch(err => console.log(err));

    try {
      //if property registration request already exist return will string
      //if property doesn't exist we will get a JSON error and then catch block will get initialized

      let propertyBuffer = JSON.parse(propertyDetails.toString());

      return "Request to register this property on the network already exist, please have a registrar approve the property registration request";

    }

    catch (err) {
      //new composite key for approved user
      const approvedUserKey = ctx.stub.createCompositeKey('org.property-registration-network.regnet.approvedUser', [name + '-' + aadharNumber]);

      let userBuffer = await ctx.stub.getState(approvedUserKey).catch(err => console.log(err));

      try {
        //checking if the user is approved or no, if user is not approved go to catch block and return String
        //if approved user exist then continue with property registration

        let userDetails = JSON.parse(userBuffer.toString());

        let newPropertyObject = {

          propertyId: propertyId,

          owner: approvedUserKey,

          price: price,

          status: status

        };

        let dataBuffer = Buffer.from(JSON.stringify(newPropertyObject));

        await ctx.stub.putState(propertyKey, dataBuffer);

        return newPropertyObject;

      }

      catch (err) {

        return "This user is either not approved or doesn't exist in the Registered network, Please raise a user Registration request and then have the user approved by a Registrar"

      }
    }
  }

  /**
  
   * View approved property
  
   * @param ctx - The transaction context object
   * @param propertyId - unique ID
  
   * @return - returns property obj
  
   */

  async viewProperty(ctx, propertyId) {

    const approvedPropertyKey = ctx.stub.createCompositeKey('org.property-registration-network.regnet.approvedPropertyKey', [propertyId]);

    let propertyBuffer = await ctx.stub.getState(approvedPropertyKey).catch(err => console.log(err));

    try {
      //checking if property is approved and if it exist in the network
      //if property doesn't exist go to catch block and return String
      return JSON.parse(propertyBuffer.toString());

    }

    catch (err) {

      return "This property is either not approved or doesn't exist in the network. Please raise property registration request and then have a Registrar approve the property";

    }

  }

  /**

 * update property

 * @param ctx - The transaction context object

 * @param propertyId - unique ID

 * @param name - Name of the user

 * @param Aadhar - Aadhar number of the user

 * @param status - registered or onSale

 * @return - returns updated property object

 */

  async updateProperty(ctx, propertyId, name, aadharNumber, status) {
    //to chekc if only users peer are used to interact with this function
    if (ctx.clientIdentity.getMSPID() != "usersMSP") {
      return "Users should be used to Update property details";
    }
    //creating composite key for approved user and approved Property
    const approvedUserKey = ctx.stub.createCompositeKey('org.property-registration-network.regnet.approvedUser', [name + '-' + aadharNumber]);

    const approvedPropertyKey = ctx.stub.createCompositeKey('org.property-registration-network.regnet.approvedPropertyKey', [propertyId]);



    let propertyBuffer = await ctx.stub.getState(approvedPropertyKey).catch(err => console.log(err));

    try {
      //checking if property exist, if not go to catch and return String
      let propertyDetails = JSON.parse(propertyBuffer.toString());


      //check if user who is trying to update the property details is actually the propety owner

      if (propertyDetails.owner == approvedUserKey) {

        //Make sure status can  only hold registered ot onSale, anyother value passed will lead to invalid status
        if (status == "registered" || status == "onSale") {

          propertyDetails.status = status;

          let updatedPropertyBuffer = Buffer.from(JSON.stringify(propertyDetails));

          await ctx.stub.putState(approvedPropertyKey, updatedPropertyBuffer);

          return propertyDetails;

        }

        else {

          return "Status passed to the function is neither registered nor onSale. Please re-enter status value again.";

        }

      }

      else {

        return "This user is not the owner of the property";

      }

    }

    catch (err) {

      return "Property either doesn't exist or not approved on the network";

    }
  }

  /**

 * purchase property

 * @param ctx - The transaction context object

 * @param propertyId - unique ID

 * @param name - Name of the user

 * @param Aadhar - Aadhar number of the user

 * @return - returns 3 object : New onwer object, old Owner object and Updated property object

 */

  async purchaseProperty(ctx, propertyId, name, aadharNumber) {
    //to chekc if only users peer are used to interact with this function
    if (ctx.clientIdentity.getMSPID() != "usersMSP") {
      return "Users should be used to purchase a property";
    }
    //creating 2 composite key for approved property and approved user (User who wish to buy the property)
    const approvedPropertyKey = ctx.stub.createCompositeKey('org.property-registration-network.regnet.approvedPropertyKey', [propertyId]);

    const approvedUserKey = ctx.stub.createCompositeKey('org.property-registration-network.regnet.approvedUser', [name + '-' + aadharNumber]);



    let propertyBuffer = await ctx.stub.getState(approvedPropertyKey).catch(err => console.log(err));

    try {
      //check if the property is approved and is in the network
      //if not go to the outer catch block and return "property doesn't exist"
      let propertyDetails = JSON.parse(propertyBuffer.toString());

      //checking if the property can be sold or not? can only be sold if status = onSale.
      if (propertyDetails.status == "onSale") {

        let approvedUserBuffer = await ctx.stub.getState(approvedUserKey).catch(err => console.log(err));

        try {
          //checking if the approvedUser(User who wish to buy) is approved on the network
          let approvedUserData = JSON.parse(approvedUserBuffer.toString());

          //checking if user who wish to buy have enough upGrad coins to buy the property
          if (approvedUserData.upGradCoins >= propertyDetails.price) {

            const orignalPropertyOwnerKey = propertyDetails.owner;

            let orignalPropertyOwnerBuffer = await ctx.stub.getState(orignalPropertyOwnerKey).catch(err => console.log(err));

            let orignalPropertyOwnerData = JSON.parse(orignalPropertyOwnerBuffer.toString());

            //checking if the owner of the property is trying to buy the same property again
            //user who wish to buy != owner of the property
            if (orignalPropertyOwnerKey != approvedUserKey) {

              orignalPropertyOwnerData.upGradCoins = +(orignalPropertyOwnerData.upGradCoins) + +(propertyDetails.price);

              approvedUserData.upGradCoins -= propertyDetails.price;


              //updating the new owner details and changing the status of the property to registered
              propertyDetails.owner = approvedUserKey;

              propertyDetails.status = "registered";


              //pushing the updated owner details on the ledger
              let newOwnerBuffer = Buffer.from(JSON.stringify(approvedUserData));

              await ctx.stub.putState(approvedUserKey, newOwnerBuffer);



              //pushing the updated owner details on the ledger
              let orignalOwnerUpdatedBuffer = Buffer.from(JSON.stringify(orignalPropertyOwnerData));

              await ctx.stub.putState(orignalPropertyOwnerKey, orignalOwnerUpdatedBuffer);



              //pushing the updated property details on the ledger
              let propertyUpdateBuffer = Buffer.from(JSON.stringify(propertyDetails));

              await ctx.stub.putState(approvedPropertyKey, propertyUpdateBuffer);


              //returning old, new and updated property details
              return "OldOwner Updated Detail  " + orignalOwnerUpdatedBuffer + "                            NewOwner Updated Details " + newOwnerBuffer + "                         Updated Property Details " + propertyUpdateBuffer;

            }

            else {

              return "You already own this Property";

            }

          }

          else {

            return "You do not have enough upGradCoins to buy this property, Recharge your account";

          }

        }

        catch (err) {

          return "The user either doesn't exist or is not approved";

        }

      }

      else {

        return "Property is not for SALE.";

      }

    }



    catch (err) {

      return "Property either doesn't exist or is not approved.";

    }

  }



}

module.exports = UserContract;

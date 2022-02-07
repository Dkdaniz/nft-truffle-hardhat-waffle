const ReportManager = artifacts.require("Nft");

contract("ReportManager", accounts => {
    const addressBlank = '0x0000000000000000000000000000000000000000'

    /* How hashDoc work
    // hashDoc = SHA1 + SHA1;
    // let hashDocLast = "0000000000000000000000000000000000000000";
    // let hashDocActual = "86f7e437faa5a7fce15d1ddcb9eaeaea377667b8";
    // let hashDoc = hashDocLast + hashDocActual;
    */

    let hashDocValid = "0x000000000000000000000000000000000000000086f7e437faa5a7fce15d1ddcb9eaeaea377667b8"
    let reportManager

    beforeEach(async () => {
        reportManager = await ReportManager.deployed();
    });

    it("Should return ERC1155: mint to the zero address. If the field to dont was provided", async () => {
      let errorResponse;
      let tokenId = 1;

      try {
        await reportManager.mint(addressBlank, tokenId, hashDocValid);
      } catch (error) {
        errorResponse = error;
      }

      assert.equal(
        errorResponse?.reason,
        "ERC1155: mint to the zero address"
      );
    });

    it("Should return ERC1155: tokenId already registered. If the same tokenId is used", async () => {
      let errorResponse;
      let tokenId = 1;

      try {
        await reportManager.mint(accounts[0], tokenId, hashDocValid);
        await reportManager.mint(accounts[0], tokenId, hashDocValid);
      } catch (error) {
        errorResponse = error;
      }

      assert.equal(
        errorResponse.reason,
        "ERC1155: tokenId already registered",
      );
    });

    it("Should return ERC1155: hashDoc dont be the zero. If the field hashDoc dont was provided", async () => {
      let errorResponse;
      let hashDocInvalid = '0x';
      let tokenId = 3;

      try {
        await reportManager.mint(accounts[0], tokenId, hashDocInvalid);
      } catch (error) {
        errorResponse = error;
      }

      assert.equal(
        errorResponse.reason,
        "ERC1155: hashDoc dont be the zero",
      );
    });

    it("Should return ERC1155: hashDoc invalid. If the length is smaller than 40", async () => {
      let errorResponse;
      let tokenId = 3;
      let hashDocInvalid = '0x00000';
    
      try {
        await reportManager.mint(accounts[0], tokenId, hashDocInvalid);
      } catch (error) {
        errorResponse = error;
      }

      assert.equal(
        errorResponse.reason,
        "ERC1155: hashDoc invalid",
      );
    });

    it("Should return balance bigger than zero if report is create", async () => {
      let balance = 0;
      let tokenId = 2;

      try {
        await reportManager.mint(accounts[0], tokenId, hashDocValid);

        const data = await reportManager.balanceOf.call(accounts[0], `${tokenId}`)
        balance = parseInt(data.toString());
      } catch (error) {}
      
      assert.equal(balance === 1, true);
    });
});
const cardDatamapper = require('../models/cardDatamapper');

const cardController = {

   async createCard (request, response) {

      try {

            console.log("request.body pour la crea de cartes", request.body.cardType);

            if(request.body.cardType === "focus") {

                  const focusFound = await cardDatamapper.findFocusByGameId(request.params.id);

                  console.log("focusFound", focusFound);

                  if (focusFound) {
                        position = focusFound[focusFound.length - 1].position + 1;
                  }
                  else {
                        position = 1;
                  }
                  console.log("position", position);

                  await cardDatamapper.insertFocus(request.body, position, request.params.id);
                  console.log(request.body);
                        
                  return response.json({ Message: "Focus creation succeed !"});

            }
            else {
                  const cardsToMove = await cardDatamapper.findAllByPosition(request.body);
            
                  if (cardsToMove) {
                        
                        for (let i = 0; i < cardsToMove.length; i++) {
                              await cardDatamapper.updatePosition(request.body.cardType, cardsToMove[i].id, cardsToMove[i].position + 1);
                        }                                    
                  }
                  
                  await cardDatamapper.insert(request.body);
                  // Check status code for error            
                  return response.json({ Message: "Card creation succeed !"});
            } 
      } catch (err) {
            return response.json({errotType: err.message, errorMessage: "Card creation failed"});
      }
   },

   async createFocus (request, response) {

      
   }
}

module.exports = cardController;
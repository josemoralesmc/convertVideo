export default function checkTimeLinks(createdDate: Date) {
    const currentDate = new Date();

    const timeDifference = currentDate.getTime() - createdDate.getTime();
  
    const hoursDifference = timeDifference / (1000 * 60 * 60);
  
    return hoursDifference > 100;
  }
export const validateEvent = (event) => {
    return (
      typeof event.title === "string" &&
      typeof event.date === "string" &&
      typeof event.image === "string" &&
      typeof event.location === "string"
    );
};

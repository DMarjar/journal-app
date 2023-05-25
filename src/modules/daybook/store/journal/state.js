export default () => ({
  isLoading: true,
  entries: [
    {
      id: new Date().getTime(), // ejemplo: 1630540800000
      date: new Date().toDateString(), // ejemplo: "Fri Sep 03 2021"
      text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo esse nemo, nam pariatur blanditiis vero, fugit ab facilis est totam, cumque quis! Numquam, dignissimos impedit officiis sunt tenetur unde molestias!",
      picture: null,
    },
    {
      id: new Date().getTime() + 1000, // ejemplo: 1630540800000
      date: new Date().toDateString(), // ejemplo: "Fri Sep 03 2021"
      text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod non aliquam sint odit repudiandae! Optio nesciunt aut, nihil, fuga ipsum, magnam porro laborum consequuntur iusto cupiditate libero quasi harum repellat!",
      picture: null,
    },
    {
      id: new Date().getTime() + 2000, // ejemplo: 1630540800000
      date: new Date().toDateString(), // ejemplo: "Fri Sep 03 2021"
      text: "Eu culpa ut minim qui laboris quis. Do laboris eu aute aute voluptate incididunt qui cillum ad eu occaecat non.",
      picture: null,
    },
  ],
});

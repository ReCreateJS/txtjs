export var EventNames = [
    "click",
    "dblclick",
    "mousedown",
    "mouseout",
    "mouseover",
    "pressmove",
    "pressup",
    "rollout",
    "rollover",
    "added",
    "removed",
    "tick"
];
/**
 *
 * @param source
 * @param shape
 *
 * @todo: simplify with a loop
 */
export default function (original, shape) {
    EventNames.forEach(function (eventName) {
        if (original[eventName]) {
            shape.on(eventName, original[eventName]);
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbHktc2hhcGUtZXZlbnQtbGlzdGVuZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3V0aWxzL2FwcGx5LXNoYXBlLWV2ZW50LWxpc3RlbmVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxNQUFNLENBQUMsSUFBTSxVQUFVLEdBQUc7SUFDeEIsT0FBTztJQUNQLFVBQVU7SUFDVixXQUFXO0lBQ1gsVUFBVTtJQUNWLFdBQVc7SUFDWCxXQUFXO0lBQ1gsU0FBUztJQUNULFNBQVM7SUFDVCxVQUFVO0lBQ1YsT0FBTztJQUNQLFNBQVM7SUFDVCxNQUFNO0NBQ1AsQ0FBQztBQUVGOzs7Ozs7R0FNRztBQUNILE1BQU0sQ0FBQyxPQUFPLFdBQ1osUUFBcUIsRUFDckIsS0FBK0I7SUFFL0IsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFBLFNBQVM7UUFDMUIsSUFBSSxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDdkIsS0FBSyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7U0FDMUM7SUFDSCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTaGFwZUV2ZW50cyB9IGZyb20gXCIuLi9JbnRlcmZhY2VzXCI7XG5cbmV4cG9ydCBjb25zdCBFdmVudE5hbWVzID0gW1xuICBcImNsaWNrXCIsXG4gIFwiZGJsY2xpY2tcIixcbiAgXCJtb3VzZWRvd25cIixcbiAgXCJtb3VzZW91dFwiLFxuICBcIm1vdXNlb3ZlclwiLFxuICBcInByZXNzbW92ZVwiLFxuICBcInByZXNzdXBcIixcbiAgXCJyb2xsb3V0XCIsXG4gIFwicm9sbG92ZXJcIixcbiAgXCJhZGRlZFwiLFxuICBcInJlbW92ZWRcIixcbiAgXCJ0aWNrXCJcbl07XG5cbi8qKlxuICpcbiAqIEBwYXJhbSBzb3VyY2VcbiAqIEBwYXJhbSBzaGFwZVxuICpcbiAqIEB0b2RvOiBzaW1wbGlmeSB3aXRoIGEgbG9vcFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihcbiAgb3JpZ2luYWw6IFNoYXBlRXZlbnRzLFxuICBzaGFwZTogY3JlYXRlanMuRXZlbnREaXNwYXRjaGVyXG4pIHtcbiAgRXZlbnROYW1lcy5mb3JFYWNoKGV2ZW50TmFtZSA9PiB7XG4gICAgaWYgKG9yaWdpbmFsW2V2ZW50TmFtZV0pIHtcbiAgICAgIHNoYXBlLm9uKGV2ZW50TmFtZSwgb3JpZ2luYWxbZXZlbnROYW1lXSk7XG4gICAgfVxuICB9KTtcbn1cbiJdfQ==
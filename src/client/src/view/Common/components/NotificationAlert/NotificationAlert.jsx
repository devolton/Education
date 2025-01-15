function NotificationAlert({title, description=""}){
    return (
        <div className="alert alert-ligth text-center" role="alert">
            <h4 className="alert-heading">{title}</h4>
            <p>{description}</p>
        </div>
    )
}
export default NotificationAlert;
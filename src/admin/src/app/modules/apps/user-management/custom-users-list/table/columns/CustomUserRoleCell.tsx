import {FC} from 'react'
import {CustomUser} from "../../core/custom.user.model.ts";

type Props = {
    user: CustomUser
}

const CustomUserRoleCell: FC<Props> = ({user}) =>
    <div>
        {
            user.roles.map((oneRole)=>{
                return (  <div key={`role-${oneRole.id}`} className='badge badge-light-success fw-bolder me-1'>
                        {oneRole.value}
                    </div>
                )
            })
        }
    </div>


export {CustomUserRoleCell}
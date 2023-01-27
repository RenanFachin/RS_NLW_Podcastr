export function convertDurationToTimeString(duration: number) {
    const hours = Math.floor(duration / (60 * 60))

    // Pegando quantos minutos restam da divisão acima
    const minutes = Math.floor((duration % (60 * 60)) / 60)

    const seconds = duration % 60


    // Retornando um array e percorrendo ele para adicionar 0 caso haja necessidade em cada uma das variáveis e também juntando eles com ':'
    const finalResult = [hours, minutes, seconds].map(unit => String(unit).padStart(2, '0')).join(':')


    return finalResult
}